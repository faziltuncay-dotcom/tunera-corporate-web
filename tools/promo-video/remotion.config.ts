import { Config } from "@remotion/cli/config";

/**
 * Remotion build/render configuration for the Tunera promo pipeline.
 *
 * Uses H.264 / MP4 with a moderate-quality CRF (21) tuned for
 * Instagram Reels — high enough to keep the marine illustrations
 * sharp at 1080×1920, low enough to keep the file under Instagram's
 * 100 MB upload cap. The Chromium browser is reused across renders
 * so back-to-back `pnpm render` invocations don't re-launch.
 */
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(21);
Config.setColorSpace("default");
Config.setOverwriteOutput(true);

// Point Remotion's `staticFile()` at the Tunera project's public/
// directory so the composition can reference both the curated brand
// illustrations (public/assets/brand/...) and the freshly captured
// screenshots (public/generated/promo-captures/...) without copying
// or symlinking anything.
Config.setPublicDir("../../public");
