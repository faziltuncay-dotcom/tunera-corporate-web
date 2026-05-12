import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

/**
 * Entry point consumed by `remotion render` / `remotion still`.
 * Registers the composition tree so the CLI can resolve each id
 * (`ReelsMain`, `ReelsStory`, `CoverStill`) and write the requested
 * output file.
 */
registerRoot(RemotionRoot);
