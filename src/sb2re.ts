import scrapbox2Review from '@fabon/sb2re';
import type { ConverterOption } from '@fabon/sb2re';

export function convert(sbText: string, options: ConverterOption) {
    const errors: string[] = [];
    const warnings: string[] = [];
    const reviewText = scrapbox2Review(sbText, {
        ...options,
        logger: {
            error(message) {
                errors.push(message);
            },
            warn(message) {
                warnings.push(message);
            },
        },
    });
    return {
        text: reviewText,
        errors,
        warnings,
    };
}
