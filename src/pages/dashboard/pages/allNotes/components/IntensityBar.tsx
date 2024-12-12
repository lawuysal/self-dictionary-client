function getSolidColor(intensity: number) {
  if (intensity <= 20) {
    return "#f04b43";
  } else if (intensity <= 40) {
    return "#df9140";
  } else if (intensity <= 60) {
    return "#e8c468";
  } else if (intensity <= 80) {
    return "#9bc172";
  } else {
    return "#10b97b";
  }
}

export default function IntensityBar({ intensity }: { intensity: number }) {
  const solidColor = getSolidColor(intensity);
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted dark:bg-foreground">
      <div
        className="h-full rounded-full"
        style={{
          width: `${intensity}%`,
          backgroundColor: solidColor,
        }}
      />
    </div>
  );
}
