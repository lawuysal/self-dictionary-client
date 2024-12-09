export function getAvatarFallbackText(
  firstName: string | null,
  lastName: string | null,
) {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`;
}
