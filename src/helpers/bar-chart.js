import { langColorMappings } from "../assets/lang-color-mappings.js";

export function generatePercArray(array) {
  const countMap = {};

  for (const item of array) {
    countMap[item] = (countMap[item] || 0) + 1;
  }

  const totalCount = array.length;

  const percentageMap = {};
  for (const key in countMap) {
    percentageMap[key] = (countMap[key] / totalCount) * 100;
  }

  return percentageMap;
}

export function generateSVGBarChart(data) {
  const width = 600;
  const height = 100;
  const barHeight = 30;
  const maxPercentage = 100;

  const bars = Object.keys(data).map((key, index) => {
    const percentage = data[key];
    const barWidth = (width * percentage) / maxPercentage;
    return {
      label: key,
      width: barWidth,
      color: langColorMappings[key],
      y: index * (barHeight + 5),
    };
  });

  let svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;

  bars.forEach((bar) => {
    svgContent += `<rect x="0" y="${bar.y}" width="${bar.width}" height="${barHeight}" fill="${bar.color}" />`;
    svgContent += `<text x="${bar.width + 5}" y="${bar.y + barHeight / 2}" dy=".35em">${bar.label} ${((bar.width / width) * maxPercentage).toFixed(2)}%</text>`;
  });

  svgContent += "</svg>";
  return svgContent;
}
