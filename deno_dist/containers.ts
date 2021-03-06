import { Cacher } from "./storage.ts";

/* TYPES */

import type { TemplateFunction } from "./compile.ts";

/* END TYPES */

/**
 * Eta's template storage
 *
 * Stores partials and cached templates
 */

var templates = new Cacher<TemplateFunction>({});

export { templates };
