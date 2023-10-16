export const textSizes = {
  medium: {
    Title: 20,
    Subtitle: 18,
    Text: 16,
    Small: 14,
    Tiny: 12,
  },
  large: {
    Title: 24,
    Subtitle: 22,
    Text: 20,
    Small: 18,
    Tiny: 16,
  },
  small: {
    Title: 18,
    Subtitle: 16,
    Text: 14,
    Small: 12,
    Tiny: 10,
  },
};

export function getTextSize(size) {
  return textSizes[size];
}
