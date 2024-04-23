// @flow
import d3 from "d3";

const dates = [
  new Date(2000),
  new Date(2001),
  new Date(2002),
  new Date(2003),
  new Date(2004),
  new Date(2005),
  new Date(2006),
  new Date(2007),
  new Date(2008),
  new Date(2009),
  new Date(2010),
  new Date(2011),
  new Date(2012),
  new Date(2013),
  new Date(2014),
  new Date(2015),
  new Date(2016),
  new Date(2017),
  new Date(2018),
  new Date(2019),
  new Date(2020),
  new Date(2021),
  new Date(2022),
  new Date(2023),
  new Date(2024),
  new Date(2025),
  new Date(2026),
  new Date(2027),
  new Date(2028),
  new Date(2029),
  new Date(2030),
  new Date(2031),
  new Date(2032),
  new Date(2033),
  new Date(2034),
  new Date(2035),
  new Date(2036),
  new Date(2037),
  new Date(2038),
  new Date(2039),
  new Date(2040),
  new Date(2041),
  new Date(2042),
  new Date(2043),
  new Date(2044),
  new Date(2045),
  new Date(2046),
  new Date(2047),
  new Date(2048),
  new Date(2049),
  new Date(2050),
  new Date(2051),
  new Date(2052),
  new Date(2053),
  new Date(2054),
  new Date(2055),
  new Date(2056),
  new Date(2057),
  new Date(2058),
  new Date(2059),
  new Date(2060),
  new Date(2061),
  new Date(2062),
  new Date(2063),
  new Date(2064),
  new Date(2065),
  new Date(2066),
  new Date(2067),
  new Date(2068),
  new Date(2069),
  new Date(2070),
  new Date(2071),
  new Date(2072),
  new Date(2073),
  new Date(2074),
  new Date(2075),
  new Date(2076),
  new Date(2077),
  new Date(2078),
  new Date(2079),
  new Date(2080),
  new Date(2081),
  new Date(2082),
  new Date(2083),
  new Date(2084),
  new Date(2085),
  new Date(2086),
  new Date(2087),
  new Date(2089),
  new Date(2089),
  new Date(2090),
  new Date(2091),
  new Date(2092),
  new Date(2093),
  new Date(2094),
  new Date(2095),
  new Date(2096),
  new Date(2097),
  new Date(2098),
  new Date(2099),
  new Date(2100),
  new Date(2101),
  new Date(2102),
  new Date(2103),
  new Date(2104),
  new Date(2105),
  new Date(2106),
  new Date(2107),
  new Date(2108),
  new Date(2109),
  new Date(2110),
  new Date(2111),
  new Date(2112),
  new Date(2113),
  new Date(2114),
  new Date(2115),
  new Date(2116),
  new Date(2117),
  new Date(2118),
  new Date(2119),
  new Date(2120),
  new Date(2121),
  new Date(2122),
  new Date(2123),
  new Date(2124),
  new Date(2125),
  new Date(2126),
  new Date(2127),
  new Date(2128),
  new Date(2129),
  new Date(2130),
  new Date(2131),
  new Date(2132),
  new Date(2133),
  new Date(2134),
  new Date(2135),
  new Date(2136),
  new Date(2137),
  new Date(2138),
  new Date(2139),
  new Date(2140),
  new Date(2141),
  new Date(2142),
  new Date(2143),
  new Date(2144),
  new Date(2145),
  new Date(2146),
  new Date(2147),
  new Date(2148),
  new Date(2149),
  new Date(2150),
  new Date(2151),
  new Date(2152),
  new Date(2153),
  new Date(2154),
  new Date(2155),
  new Date(2156),
  new Date(2157),
  new Date(2158),
  new Date(2159),
  new Date(2160),
  new Date(2161),
  new Date(2162),
  new Date(2163),
  new Date(2164),
  new Date(2165),
  new Date(2166),
  new Date(2167),
  new Date(2168),
  new Date(2169),
  new Date(2170),
  new Date(2171),
  new Date(2172),
  new Date(2173),
  new Date(2174),
  new Date(2175),
  new Date(2176),
  new Date(2177),
  new Date(2178),
  new Date(2179),
  new Date(2180),
  new Date(2181),
  new Date(2182),
  new Date(2183),
  new Date(2184),
  new Date(2185),
  new Date(2186),
  new Date(2187),
  new Date(2189),
  new Date(2189),
  new Date(2190),
  new Date(2191),
  new Date(2192),
  new Date(2193),
  new Date(2194),
  new Date(2195),
  new Date(2196),
  new Date(2197),
  new Date(2198),
  new Date(2199),
  new Date(2200),
  new Date(2201),
  new Date(2202),
  new Date(2203),
  new Date(2204),
  new Date(2205),
  new Date(2206),
  new Date(2207),
  new Date(2208),
  new Date(2209),
  new Date(2210),
  new Date(2211),
  new Date(2212),
  new Date(2213),
  new Date(2214),
  new Date(2215),
  new Date(2216),
  new Date(2217),
  new Date(2218),
  new Date(2219),
  new Date(2220),
  new Date(2221),
  new Date(2222),
  new Date(2223),
  new Date(2224),
  new Date(2225),
  new Date(2226),
  new Date(2227),
  new Date(2228),
  new Date(2229),
  new Date(2230),
  new Date(2231),
  new Date(2232),
  new Date(2233),
  new Date(2234),
  new Date(2235),
  new Date(2236),
  new Date(2237),
  new Date(2238),
  new Date(2239),
  new Date(2240),
  new Date(2241),
  new Date(2242),
  new Date(2243),
  new Date(2244),
  new Date(2245),
  new Date(2246),
  new Date(2247),
  new Date(2248),
  new Date(2249),
  new Date(2250),
  new Date(2251),
  new Date(2252),
  new Date(2253),
  new Date(2254),
  new Date(2255),
  new Date(2256),
  new Date(2257),
  new Date(2258),
  new Date(2259),
  new Date(2260),
  new Date(2261),
  new Date(2262),
  new Date(2263),
  new Date(2264),
  new Date(2265),
  new Date(2266),
  new Date(2267),
  new Date(2268),
  new Date(2269),
  new Date(2270),
  new Date(2271),
  new Date(2272),
  new Date(2273),
  new Date(2274),
  new Date(2275),
  new Date(2276),
  new Date(2277),
  new Date(2278),
  new Date(2279),
  new Date(2280),
  new Date(2281),
  new Date(2282),
  new Date(2283),
  new Date(2284),
  new Date(2285),
  new Date(2286),
  new Date(2287),
  new Date(2289),
  new Date(2289),
  new Date(2290),
  new Date(2291),
  new Date(2292),
  new Date(2293),
  new Date(2294),
  new Date(2295),
  new Date(2296),
  new Date(2297),
  new Date(2298),
  new Date(2299),
  new Date(2300),
  new Date(2301),
  new Date(2302),
  new Date(2303),
  new Date(2304),
  new Date(2305),
  new Date(2306),
  new Date(2307),
  new Date(2308),
  new Date(2309),
  new Date(2310),
  new Date(2311),
  new Date(2312),
  new Date(2313),
  new Date(2314),
  new Date(2315),
  new Date(2316),
  new Date(2317),
  new Date(2318),
  new Date(2319),
  new Date(2320),
  new Date(2321),
  new Date(2322),
  new Date(2323),
  new Date(2324),
  new Date(2325),
  new Date(2326),
  new Date(2327),
  new Date(2328),
  new Date(2329),
  new Date(2330),
  new Date(2331),
  new Date(2332),
  new Date(2333),
  new Date(2334),
  new Date(2335),
  new Date(2336),
  new Date(2337),
  new Date(2338),
  new Date(2339),
  new Date(2340),
  new Date(2341),
  new Date(2342),
  new Date(2343),
  new Date(2344),
  new Date(2345),
  new Date(2346),
  new Date(2347),
  new Date(2348),
  new Date(2349),
  new Date(2350),
  new Date(2351),
  new Date(2352),
  new Date(2353),
  new Date(2354),
  new Date(2355),
  new Date(2356),
  new Date(2357),
  new Date(2358),
  new Date(2359),
  new Date(2360),
  new Date(2361),
  new Date(2362),
  new Date(2363),
  new Date(2364),
  new Date(2365),
  new Date(2366),
  new Date(2367),
  new Date(2368),
  new Date(2369),
  new Date(2370),
  new Date(2371),
  new Date(2372),
  new Date(2373),
  new Date(2374),
  new Date(2375),
  new Date(2376),
  new Date(2377),
  new Date(2378),
  new Date(2379),
  new Date(2380),
  new Date(2381),
  new Date(2382),
  new Date(2383),
  new Date(2384),
  new Date(2385),
  new Date(2386),
  new Date(2387),
  new Date(2389),
  new Date(2389),
  new Date(2390),
  new Date(2391),
  new Date(2392),
  new Date(2393),
  new Date(2394),
  new Date(2395),
  new Date(2396),
  new Date(2397),
  new Date(2398),
  new Date(2399),
  new Date(2499),
];

type Props = {
  width: number,
  height: number,
  margin: {
    left: number,
    right: number,
    top: number,
    bottom: number,
  },
};

export type State = {
  data: Array<number>,
};

/**
 * Abstract class for a D3 chart.
 */
export default class Chart {
  el: Element;
  props: Props;
  dispatch: Function;

  constructor(el: Element, props: Props) {
    this.el = el;
    this.props = props;
    this.dispatch = d3.dispatch("navigation");
  }

  /**
   * To override. Creates the initial rendering of the chart.
   */
  // create() {}

  /**
   * Creates the root-level SVG element.
   * @return {object} D3 SVG root.
   */
  createRoot() {
    const { width, height, margin } = this.props;

    const svg = d3
      .select(this.el)
      .append("svg")
      .attr("class", "chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    return svg;
  }

  /**
   * Retrieves the scales for our chart.
   * Those are numerical time series scales on full extent of both domains.
   */
  getScales(state: State) {
    const { height, width } = this.props;

    const x = d3.time
      .scale()
      .range([0, width])
      .domain(d3.extent(dates));

    const y = d3.scale
      .linear()
      .range([height, 0])
      .domain(d3.extent(state.data[0]))
      .nice();

    return {
      x: x,
      y: y,
    };
  }

  /**
   * To override. Populates the initial renderings with content.
   */
  // update() {}

  /**
   * To use to flush out D3 transitions.
   */
  preventTransitions() {
    const now = Date.now;
    // $FlowFixMe
    Date.now = () => Infinity;
    d3.timer.flush();
    // $FlowFixMe
    Date.now = now;
  }

  /**
   * Wraps multi-line text.
   * http://bl.ocks.org/mbostock/7555321
   */
  wrapText(selections: Object) {
    selections.each(function wrap() {
      const text = d3.select(this);
      const words = text
        .text()
        .split(/\s+/)
        .reverse();
      const lineHeight = 1.1; // ems
      const y = text.attr("y");
      const dy = parseFloat(text.attr("dy"));

      let line = [];
      let lineNumber = 0;
      let word = words.pop();
      let tspan = text
        .text(null)
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", dy + "em");

      while (word) {
        line.push(word);
        tspan.text(line.join(" "));
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", 0)
          .attr("y", y)
          .attr("dy", ++lineNumber * lineHeight + dy + "em")
          .text(word);
        word = words.pop();
      }
    });
  }

  /**
   * Can be overriden. Destroys the rendered SVG.
   */
  destroy() {
    d3
      .select(this.el)
      .selectAll("svg")
      .remove();
  }
}
