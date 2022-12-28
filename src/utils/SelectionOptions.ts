export const limitOptions = [10, 25, 50, 100].map((value) => ({
  label: value.toString(),
  value,
}));

export const gameOptions = ["Powerball", "Mega Millions", "SuperLotto Plus"].map(
  (label) => ({
    label,
    value: label.replace(/ /g, "_").toLowerCase(),
  })
);

export const randomizeOptions = [
  { label: "Top numbers", value: 5 },
  { label: "Tier 1", value: 10 },
  { label: "Tier 2", value: 20 },
];