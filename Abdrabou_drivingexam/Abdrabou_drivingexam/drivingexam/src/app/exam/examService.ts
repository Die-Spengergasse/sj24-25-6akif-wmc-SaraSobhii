export function getFeedbackText(pointsReached: number, pointsMax: number): string {
  if (pointsMax === 0) return "";

  const ratio = pointsReached / pointsMax;

  if (ratio >= 0.95) return "Excellent Work!";
  if (ratio >= 0.70) return "Well done :3";
  if (ratio >= 0.55) return "Keep it up :D";
  return "Try Again!";
}
