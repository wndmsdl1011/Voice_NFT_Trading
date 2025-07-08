const { generateToken } = require("../utils/jwt");
const User = require("../models/User.model");

exports.handleOAuthCallback = (req, res) => {
  console.log("[CONTROLLER] handleOAuthCallback 실행됨");
  console.log("[CONTROLLER] req.oauth:", req.oauth);

  const { err, user, info } = req.oauth;

  if (err) {
    const errorMsg = encodeURIComponent(err.message || "OAuth 에러");
    console.error("[CONTROLLER] OAuth 에러 발생:", err);
    return res.redirect(`http://localhost:3000/login?error=${errorMsg}`);
  }

  if (user) {
    console.log("[CONTROLLER] 기존 사용자 로그인:", user);
    const token = generateToken({ id: user.id });

    // 쿠키에도 토큰 저장 (기존 방식 유지)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.redirect("http://localhost:3000/auth-success");
  }

  if (info?.profile) {
    console.log("[CONTROLLER] 신규 사용자 - 온보딩 필요:", info.profile);
    const onboardingToken = generateToken({ profile: info.profile }, "10m");
    res.cookie("onboarding_token", onboardingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 600000,
    });
    return res.redirect(
      `http://localhost:3000/complete-profile?token=${onboardingToken}`
    );
  }

  console.warn("[CONTROLLER] 인증 실패 - user도 없고 info.profile도 없음");
  return res.redirect("http://localhost:3000/login?error=auth_failed");
};

exports.completeProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const { walletAddress } = req.body;

    if (!profile || !walletAddress) {
      return res.status(400).json({ error: "필수 정보 누락" });
    }

    const newUser = new User({
      username: profile.displayName || "익명",
      provider: "facebook",
      facebookId: profile.id,
      profileUrl: profile.profileUrl,
      walletAddress,
    });

    await newUser.save();

    const token = require("../utils/jwt").generateToken({ id: newUser._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000,
    });

    return res.status(201).json({ success: true, user: newUser });
  } catch (err) {
    console.error("[CONTROLLER] completeProfile 에러:", err);
    return res.status(500).json({ error: "서버 오류" });
  }
};
