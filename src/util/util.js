const RESISTANCE_TYPES = new Set(['Fire', 'Lightning', 'Cold', 'Poison']);

/**
 * Parses a resistance string to extract its components
 * @param {string} str - The resistance string to parse
 * @returns {Object|null} Parsed components or null if invalid
 */
function parseResistanceString(str) {
    // Match format like "+[15-25] Fire Resist" or "+[5-10] to All Resistances"
    const rangeMatch = str.match(/^([+-])\[(\d+)-(\d+)\] (?:to )?(All )?(\w+) Resist(?:ances)?$/);
    if (rangeMatch) {
        const [, sign, minValue, maxValue, isAll, resistType] = rangeMatch;
        return {
            sign,
            minValue: parseInt(minValue),
            maxValue: parseInt(maxValue),
            resistType: isAll ? 'All' : resistType,
            isRange: true
        };
    }
    return null;
}

/**
 * Adds two ranges together
 * @param {Object} range1 - First range with minValue and maxValue
 * @param {Object} range2 - Second range with minValue and maxValue
 * @returns {Object} Combined range
 */
function addRanges(range1, range2) {
    return {
        minValue: range1.minValue + range2.minValue,
        maxValue: range1.maxValue + range2.maxValue
    };
}

/**
 * Processes resistance properties in a list of strings
 * @param {string[]} properties - Array of property strings
 * @returns {string[]} Updated array with processed resistance properties
 */
export function processResistanceProperties(properties) {
    // First, separate resistance properties from others
    const resistanceProps = [];
    const otherProps = [];
    let allResistances = null;

    properties.forEach(prop => {
        const parsed = parseResistanceString(prop);
        if (parsed) {
            if (parsed.resistType === 'All') {
                allResistances = parsed;
            } else if (RESISTANCE_TYPES.has(parsed.resistType)) {
                resistanceProps.push({ original: prop, parsed });
            } else {
                otherProps.push(prop);
            }
        } else {
            otherProps.push(prop);
        }
    });

    // Check if we can condense the resistance properties
    const canCondense = resistanceProps.length === RESISTANCE_TYPES.size &&
        resistanceProps.every(({ parsed: prop }) =>
            prop.sign === resistanceProps[0].parsed.sign &&
            prop.minValue === resistanceProps[0].parsed.minValue &&
            prop.maxValue === resistanceProps[0].parsed.maxValue
        );

    if (canCondense && !allResistances) {
        // Create condensed resistance property
        const first = resistanceProps[0].parsed;
        const condensed = `${first.sign}[${first.minValue}-${first.maxValue}] to All Resistances`;
        return [...otherProps, condensed];
    }

    // If we have "All Resistances", distribute it
    if (allResistances) {
        const processedResistances = resistanceProps.map(({ original, parsed }) => {
            const combined = addRanges(parsed, allResistances);
            return `${parsed.sign}[${combined.minValue}-${combined.maxValue}] ${parsed.resistType} Resist`;
        });
        return [...otherProps, ...processedResistances];
    }

    // If we can't condense or distribute, return original properties
    return properties;
}

export function getImageUrl(name) {
  return new URL(`./public/items/${name.replaceAll(" ", "_")}.png`, import.meta.url).href;
}

export function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}
