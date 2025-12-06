import { describe, expect, it } from 'vitest';

import { createLandingPageViewModel } from '../LandingPageService';

describe('Landing page view model', () => {
    it('returns busy times work interval', () => {
        const date = new Date();
        date.setHours(6);
        const riddles = [
            {
                id: 'x',
                contents: 'XXX',
                answers: [],
            },
        ];

        const result = createLandingPageViewModel(date, riddles);

        expect(result.workInterval).toBe('Busy Times');
    });
});
