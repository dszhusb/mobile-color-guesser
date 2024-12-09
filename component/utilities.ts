/* TYPES */
export type COLOR = RGB | HSL | HWB;

export type RGB = {
    r: number,
    g: number,
    b: number,
    a?: number,
}

export type HSL = {
    h: number,
    s: number,
    l: number
}

export type HWB = {
    h: number,
    w: number,
    b: number
}

export type Answer = {
    rgb: RGB,
    hsl: HSL,
    hwb: HWB,
    hex: string
}

/* */

export const createAnswer = (rgb: RGB): Answer => {
    const hsl = rgbToHsl(rgb)
    const hwb = rgbToHwb(rgb)
    const hex = rgbaToHex(rgb)
    return <Answer>{ rgb: rgb, hsl: hsl, hwb: hwb, hex: hex }
}

/* COLOR GENERATION */

export function randomColor(start: number, end: number): RGB {
    return <RGB>{ r: randomColorDigit(start, end), g: randomColorDigit(start, end), b: randomColorDigit(start, end) }
}

function randomColorDigit(start: number, end: number): number {
    start = Math.max(0, start);
    end = Math.min(end, 255);
    return Math.floor((end - start) * Math.random()) + start;
}

/* DAILY COLOR */

// export const getFormattedDate = (): string => {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}/${month}/${day}`;
// };

export const getColorFromDate = (date: Date): RGB => {
    const dateString = date.toISOString().split('T')[0];
    const hash = hashString(dateString);
    const rgb = hashToRGB(hash);
    return rgb;
};

const hashString = (str: string): number => {
    const primes = [31, 83, 131, 197, 233];
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        // Use different primes for each character position
        const prime = primes[i % primes.length];
        hash = ((hash << 5) ^ (hash >> 2)) + char * prime;
        hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash);
};

const hashToRGB = (hash: number): RGB => {
    const r = (hash % 255);
    const g = ((hash * 7) % 255);
    const b = ((hash * 13) % 255);
    return { r, g, b };
};

/* CONVERTERS */
//RGB <-> HSL

export const rgbToHsl = (color: RGB): HSL => { // https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
    let c: RGB = { r: color.r / 255, g: color.g / 255, b: color.b / 255 }
    const vmax = Math.max(c.r, c.g, c.b), vmin = Math.min(c.r, c.g, c.b);
    const average = (vmax + vmin) / 2;
    let hsl = <HSL>{ h: average, s: average, l: average }

    if (vmax === vmin) {
        hsl.h = 0
        hsl.s = 0
        return hsl; // achromatic
    }

    const d = vmax - vmin;
    hsl.s = hsl.l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === c.r) hsl.h = (c.g - c.b) / d + (c.g < c.b ? 6 : 0);
    if (vmax === c.g) hsl.h = (c.b - c.r) / d + 2;
    if (vmax === c.b) hsl.h = (c.r - c.g) / d + 4;
    hsl.h /= 6;

    return hsl;
}

export const hslToRgb = (c: HSL) => {
    let rgb = <RGB>{ r: 0, g: 0, b: 0 }

    if (c.s === 0) {
        rgb.r = rgb.g = rgb.b = c.l; // achromatic
    } else {
        const q = c.l < 0.5 ? c.l * (1 + c.s) : c.l + c.s - c.l * c.s;
        const p = 2 * c.l - q;
        rgb.r = hueToRgb(p, q, c.h + 1 / 3);
        rgb.g = hueToRgb(p, q, c.h);
        rgb.b = hueToRgb(p, q, c.h - 1 / 3);
    }

    rgb.r *= 255; rgb.g *= 255; rgb.b *= 255
    rgb.r = Math.round(rgb.r); rgb.g = Math.round(rgb.g); rgb.b = Math.round(rgb.b)
    return rgb;
}

const hueToRgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

//RGB <-> HEX

export function rgbaToHex(c: RGB): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    const rHex = toHex(c.r);
    const gHex = toHex(c.g);
    const bHex = toHex(c.b);
    if (c.a) {
        return `#${rHex}${gHex}${bHex}${toHex(c.a)}`;
    }
    return `#${rHex}${gHex}${bHex}`;
}

export function hexToRgba(hex: string): RGB | null {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (hex.length > 8) {
        return { r: r, g: g, b: b, a: parseInt(hex.slice(8, 10), 16) }
    } else {
        return { r: r, g: g, b: b }
    }
}

//RGB <-> HWB

export const rgbToHwb = (color: RGB): HWB => {

    let r = color.r / 255;
    let g = color.g / 255;
    let b = color.b / 255;

    var f, i, w = Math.min(r, g, b);
    let v = Math.max(r, g, b);
    let black = 1 - v;

    if (v === w) return { h: 0, w: w, b: black };
    f = r === w ? g - b : (g === w ? b - r : r - g);
    i = r === w ? 3 : (g === w ? 5 : 1);

    return { h: (i - f / (v - w)) / 6, w: Math.floor(w * 100) / 100, b: Math.floor(black * 100) / 100 }
}