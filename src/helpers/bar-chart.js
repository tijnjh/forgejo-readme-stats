import { langColorMappings } from "../assets/lang-color-mappings.js";

export function generatePercArray(array) {
  const countMap = {};

  for (const item of array) {
    for (const language in item) {
      countMap[language] = (countMap[language] || 0) + item[language];
    }
  }

  const totalCount = Object.values(countMap).reduce(
    (sum, count) => sum + count,
    0,
  );

  const percentageMap = {};
  for (const language in countMap) {
    percentageMap[language] = (countMap[language] / totalCount) * 100;
  }

  return percentageMap;
}
export function generateSVGBarChart(data) {
  // Create SVG with the same dimensions and styling as the provided example
  const width = 300;
  const height = 165;

  // Calculate total width available for bars
  const availableWidth = 250;

  // Calculate cumulative position for each language bar
  let cumulativeWidth = 0;
  const bars = [];

  Object.entries(data).forEach(([lang, percentage]) => {
    const barWidth = (availableWidth * percentage) / 100;
    bars.push({
      lang,
      percentage,
      width: barWidth,
      x: cumulativeWidth,
      color: langColorMappings[lang] || "#858585", // Fallback color if not found
    });
    cumulativeWidth += barWidth;
  });

  // Sort bars by percentage (descending) to match the example
  bars.sort((a, b) => b.percentage - a.percentage);

  // Limit to top 6 languages
  const topBars = bars.slice(0, 6);

  // Generate SVG content
  let svgContent = `
    <svg
      width="${width}"
      height="${height}"
      viewBox="0 0 ${width} ${height}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="descId"
    >
      <title id="titleId"></title>
      <desc id="descId"></desc>
      <style>
        .header {
          font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
          fill: #2f80ed;
          animation: fadeInAnimation 0.8s ease-in-out forwards;
        }
        @supports(-moz-appearance: auto) {
          /* Selector detects Firefox */
          .header { font-size: 15.5px; }
        }

        @keyframes slideInAnimation {
          from {
            width: 0;
          }
          to {
            width: calc(100%-100px);
          }
        }
        @keyframes growWidthAnimation {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .stat {
          font: 600 14px 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: #434d58;
        }
        @supports(-moz-appearance: auto) {
          /* Selector detects Firefox */
          .stat { font-size:12px; }
        }
        .bold { font-weight: 700 }
        .lang-name {
          font: 400 11px "Segoe UI", Ubuntu, Sans-Serif;
          fill: #434d58;
        }
        .stagger {
          opacity: 0;
          animation: fadeInAnimation 0.3s ease-in-out forwards;
        }
        #rect-mask rect{
          animation: slideInAnimation 1s ease-in-out forwards;
        }
        .lang-progress{
          animation: growWidthAnimation 0.6s ease-in-out forwards;
        }

        /* Animations */
        @keyframes scaleInAnimation {
          from {
            transform: translate(-5px, 5px) scale(0);
          }
          to {
            transform: translate(-5px, 5px) scale(1);
          }
        }
        @keyframes fadeInAnimation {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>

      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        rx="4.5"
        height="99%"
        stroke="#e4e2e2"
        width="299"
        fill="#fffefe"
        stroke-opacity="1"
      />

      <g
        data-testid="card-title"
        transform="translate(25, 35)"
      >
        <g transform="translate(0, 0)">
          <text
            x="0"
            y="0"
            class="header"
            data-testid="header"
          >Most Used Languages</text>
        </g>
      </g>

      <g
        data-testid="main-card-body"
        transform="translate(0, 55)"
      >
        <svg data-testid="lang-items" x="25">
          <mask id="rect-mask">
            <rect x="0" y="0" width="250" height="8" fill="white" rx="5"/>
          </mask>`;

  // Add language progress bars
  cumulativeWidth = 0;
  for (const bar of bars) {
    svgContent += `
          <rect
            mask="url(#rect-mask)"
            data-testid="lang-progress"
            x="${cumulativeWidth}"
            y="0"
            width="${bar.width}"
            height="8"
            fill="${bar.color}"
          />`;
    cumulativeWidth += bar.width;
  }

  // Add language names and percentages
  svgContent += `
          <g transform="translate(0, 25)">
            <g transform="translate(0, 0)">`;

  // Left column languages (3 languages max)
  const leftColumnLangs = topBars.slice(0, 3);
  leftColumnLangs.forEach((bar, index) => {
    svgContent += `
              <g transform="translate(0, ${index * 25})">
                <g class="stagger" style="animation-delay: ${450 + index * 150}ms">
                  <circle cx="5" cy="6" r="5" fill="${bar.color}" />
                  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
                    ${bar.lang} ${bar.percentage.toFixed(2)}%
                  </text>
                </g>
              </g>`;
  });

  svgContent += `</g><g transform="translate(150, 0)">`;

  // Right column languages (3 languages max)
  const rightColumnLangs = topBars.slice(3, 6);
  rightColumnLangs.forEach((bar, index) => {
    svgContent += `
              <g transform="translate(0, ${index * 25})">
                <g class="stagger" style="animation-delay: ${450 + index * 150}ms">
                  <circle cx="5" cy="6" r="5" fill="${bar.color}" />
                  <text data-testid="lang-name" x="15" y="10" class='lang-name'>
                    ${bar.lang} ${bar.percentage.toFixed(2)}%
                  </text>
                </g>
              </g>`;
  });

  svgContent += `
            </g>
          </g>
        </svg>
      </g>
    </svg>`;

  return svgContent;
}
