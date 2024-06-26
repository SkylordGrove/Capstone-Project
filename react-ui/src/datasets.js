import lunr from "lunr";
const axios = require("axios");

export type Dataset = {
  _id: string,
  label: string,
  data: Array<number>,
  time: String,
  timeStamp: string
};

// prettier-ignore
var datasets = [
    // 1: { id: '1', label: `Monthly Airline Passenger Numbers 1949-1960`, data: [ 108, 89, 86, 56, 114, 60, 8, 121, 50, 131, 65, 91, 66, 83, 117, 1 ] },
    // 2: { id: '2', label: `Sales Data with Leading Indicator`, data: [ 59, 84, 31, 64, 68, 127, 121, 52, 105, 103, 60, 7, 106, 68, 75, 2 ] },
    // 3: { id: '3', label: `Biochemical Oxygen Demand`, data: [ 71, 36, 91, 61, 40, 100, 16, 101, 66, 83, 117, 1, 18, 66, 87, 3 ] },
    // 4: { id: '4', label: `Determination of Formaldehyde`, data: [ 58, 122, 113, 53, 51, 16, 103, 65, 56, 42, 126, 75, 99, 54, 118, 4 ] },
    // 5: { id: '5', label: `Hair and Eye Color of Statistics Students`, data: [ 43, 128, 131, 114, 50, 131, 65, 91, 74, 130, 76, 10, 112, 70, 27, 5 ] },
    // 6: { id: '6', label: `Effectiveness of Insect Sprays`, data: [ 20, 76, 68, 127, 13, 49, 52, 126, 125, 105, 96, 37, 83, 38, 130, 6 ] },
    // 7: { id: '7', label: `Quarterly Earnings per Johnson & Johnson Share`, data: [ 33, 71, 123, 104, 21, 81, 26, 69, 80, 63, 100, 67, 105, 103, 60, 7 ] },
    // 8: { id: '8', label: `Level of Lake Huron 1875-1972`, data: [ 7, 22, 17, 32, 77, 107, 22, 33, 2, 20, 49, 43, 67, 123, 70, 8 ] },
    // 10: { id: '10', label: `Flow of the River Nile`, data: [ 96, 37, 12, 12, 52, 126, 110, 34, 24, 17, 84, 129, 53, 99, 19, 9 ] },
    // 11: { id: '11', label: `Potency of Orchard Sprays`, data: [ 32, 25, 66, 83, 4, 93, 4, 93, 42, 30, 9, 62, 74, 130, 76, 10 ] },
    // 12: { id: '12', label: `Results from an Experiment on Plant Growth`, data: [ 87, 3, 94, 51, 116, 57, 50, 131, 65, 91, 10, 82, 48, 95, 124, 11 ] },
    // 13: { id: '13', label: `Reaction Velocity of an Enzymatic Reaction`, data: [ 62, 80, 107, 45, 54, 58, 34, 85, 25, 108, 120, 115, 96, 37, 12, 12 ] },
    // 14: { id: '14', label: `Survival of passengers on the Titanic`, data: [ 97, 88, 15, 92, 49, 43, 102, 117, 93, 102, 55, 97, 86, 56, 6, 13 ] },
    // 15: { id: '15', label: `The Effect of Vitamin C on Tooth Growth in Guinea Pigs`, data: [ 18, 66, 87, 3, 90, 28, 115, 59, 73, 96, 90, 28, 94, 51, 109, 14 ] },
    // 16: { id: '16', label: `Student Admissions at UC Berkeley`, data: [ 85, 24, 57, 86, 57, 86, 119, 35, 99, 54, 118, 4, 123, 104, 88, 15 ] },
    // 17: { id: '17', label: `Road Casualties in Great Britain 1969-84`, data: [ 41, 40, 24, 17, 2, 20, 49, 43, 11, 109, 95, 23, 15, 92, 51, 16 ] },
    // 18: { id: '18', label: `UK Quarterly Gas Consumption`, data: [ 76, 10, 7, 22, 117, 1, 43, 128, 6, 13, 98, 41, 41, 40, 24, 17 ] },
    // 19: { id: '19', label: `Accidental Deaths in the US 1973-1978`, data: [ 67, 123, 70, 8, 34, 85, 32, 25, 88, 15, 80, 63, 63, 113, 81, 18 ] },
    // 20: { id: '20', label: `Violent Crime Rates by US State`, data: [ 93, 102, 55, 97, 86, 56, 6, 13, 132, 79, 11, 109, 9, 62, 44, 19 ] },
    // 21: { id: '21', label: `Lawyers' Ratings of State Judges in the US Superior Court`, data: [ 55, 97, 13, 49, 85, 24, 57, 86, 126, 75, 39, 125, 79, 21, 2, 20 ] },
    // 23: { id: '23', label: `Death Rates in Virginia (1940)`, data: [ 37, 55, 61, 116, 43, 128, 131, 114, 27, 5, 101, 74, 1, 72, 79, 21 ] },
    // 24: { id: '24', label: `Internet Usage per Minute`, data: [ 127, 111, 99, 54, 127, 111, 99, 54, 44, 19, 83, 38, 76, 10, 7, 22 ] },
    // 25: { id: '25', label: `The World's Telephones`, data: [ 110, 34, 85, 24, 30, 118, 69, 78, 23, 110, 35, 124, 11, 109, 95, 23 ] },
    // 26: { id: '26', label: `Passenger Miles on Commercial US Airlines, 1937-1960`, data: [ 10, 82, 89, 106, 91, 61, 82, 94, 69, 78, 74, 130, 110, 34, 85, 24 ] },
    // 27: { id: '27', label: `New York Air Quality Measurements`, data: [ 130, 6, 54, 58, 47, 39, 14, 119, 67, 123, 70, 8, 34, 85, 32, 25 ] },
    // 28: { id: '28', label: `Anscombe's Quartet of 'Identical' Simple Linear Regressions`, data: [ 3, 120, 38, 90, 22, 33, 127, 111, 48, 95, 124, 11, 101, 74, 92, 26 ] },
    // 31: { id: '31', label: `Quarterly Time Series of the Number of Australian Residents`, data: [ 81, 18, 116, 57, 93, 102, 55, 97, 115, 59, 106, 68, 72, 112, 28, 27 ] },
    // 32: { id: '32', label: `Speed and Stopping Distances of Cars`, data: [ 29, 50, 20, 76, 132, 79, 11, 109, 8, 121, 78, 31, 73, 96, 90, 28 ] },
    // 33: { id: '33', label: `Chicken Weights by Feed Type`, data: [ 121, 52, 37, 55, 31, 64, 67, 123, 89, 106, 63, 113, 129, 87, 128, 29 ] },
    // 34: { id: '34', label: `Mauna Loa Atmospheric CO2 Concentration`, data: [ 119, 35, 29, 50, 24, 17, 84, 129, 26, 69, 114, 60, 113, 53, 42, 30 ] },
    // 36: { id: '36', label: `Yearly Numbers of Important Discoveries`, data: [ 86, 56, 6, 13, 59, 84, 31, 64, 68, 127, 121, 52, 8, 121, 78, 31 ] },
    // 37: { id: '37', label: `Smoking, Alcohol and (O)esophageal Cancer`, data: [ 95, 23, 129, 87, 89, 106, 63, 113, 83, 38, 130, 6, 7, 22, 17, 32 ] },
    // 38: { id: '38', label: `Conversion Rates of Euro Currencies`, data: [ 120, 115, 73, 96, 23, 110, 35, 124, 7, 22, 17, 32, 77, 107, 22, 33 ] },
    // 41: { id: '41', label: `Infertility after Spontaneous and Induced Abortion`, data: [ 47, 39, 14, 119, 65, 91, 10, 82, 96, 37, 12, 12, 52, 126, 110, 34 ] },
    // 43: { id: '43', label: `Areas of the World's Major Landmasses`, data: [ 88, 15, 80, 63, 63, 113, 81, 18, 85, 24, 57, 86, 57, 86, 119, 35 ] },
    // 44: { id: '44', label: `Luteinizing Hormone in Blood Samples`, data: [ 90, 28, 115, 59, 32, 25, 66, 83, 40, 100, 16, 101, 46, 132, 71, 36 ] },
    // 46: { id: '46', label: `Annual Canadian Lynx trappings 1821-1934`, data: [ 91, 61, 82, 94, 104, 44, 40, 100, 106, 68, 75, 2, 125, 105, 96, 37 ] },
    // 48: { id: '48', label: `Motor Trend Car Road Tests`, data: [ 15, 92, 51, 16, 119, 35, 29, 50, 102, 117, 41, 40, 44, 19, 83, 38 ] },
    // 49: { id: '49', label: `Average Yearly Temperatures in New Haven`, data: [ 80, 63, 100, 67, 105, 103, 60, 7, 57, 86, 119, 35, 131, 114, 47, 39 ] },
    // 50: { id: '50', label: `Average Monthly Temperatures at Nottingham, 1920-1939`, data: [ 109, 14, 97, 88, 128, 29, 112, 70, 107, 45, 62, 80, 102, 117, 41, 40 ] },
    // 51: { id: '51', label: `Classical N, P, K Factorial Experiment`, data: [ 56, 42, 126, 75, 99, 54, 118, 4, 124, 11, 77, 107, 6, 13, 98, 41 ] },
    // 52: { id: '52', label: `Occupational Status of Fathers and their Sons`, data: [ 111, 47, 48, 95, 87, 3, 94, 51, 72, 112, 28, 27, 78, 31, 56, 42 ] },
    // 53: { id: '53', label: `Annual Precipitation in US Cities`, data: [ 101, 74, 92, 26, 39, 125, 30, 118, 41, 40, 24, 17, 2, 20, 49, 43 ] },
    // 54: { id: '54', label: `Quarterly Approval Ratings of US Presidents`, data: [ 8, 121, 78, 31, 73, 96, 90, 28, 51, 16, 103, 65, 14, 119, 104, 44 ] },
    // 55: { id: '55', label: `Vapor Pressure of Mercury as a Function of Temperature`, data: [ 22, 33, 127, 111, 27, 5, 101, 74, 92, 26, 1, 72, 62, 80, 107, 45 ] },
    // 56: { id: '56', label: `Locations of Earthquakes off Fiji`, data: [ 38, 90, 58, 122, 33, 71, 123, 104, 54, 58, 34, 85, 17, 32, 64, 46 ] },
    // 57: { id: '57', label: `Random Numbers from Congruential Generator RANDU`, data: [ 92, 26, 1, 72, 62, 80, 107, 45, 98, 41, 36, 77, 61, 116, 111, 47 ] },
    // 58: { id: '58', label: `Lengths of Major North American Rivers`, data: [ 94, 51, 109, 14, 109, 14, 97, 88, 131, 114, 47, 39, 82, 94, 122, 48 ] },
    // 59: { id: '59', label: `Measurements on Petroleum Rock Samples`, data: [ 125, 105, 96, 37, 83, 38, 130, 6, 117, 1, 43, 128, 55, 97, 13, 49 ] },
    // 62: { id: '62', label: `Monthly Sunspot Data, from 1749 to ""Present""`, data: [ 106, 68, 75, 2, 125, 105, 96, 37, 15, 92, 51, 16, 119, 35, 29, 50 ] },
    // 63: { id: '63', label: `Yearly Sunspot Data, 1700-1988`, data: [ 28, 27, 72, 112, 12, 12, 23, 110, 111, 47, 48, 95, 87, 3, 94, 51 ] },
    // 64: { id: '64', label: `Monthly Sunspot Numbers, 1749-1983`, data: [ 113, 53, 42, 30, 37, 55, 61, 116, 59, 84, 31, 64, 68, 127, 121, 52 ] },
    // 66: { id: '66', label: `Yearly Treering Data, -6000-1979`, data: [ 1, 72, 79, 21, 70, 8, 33, 71, 31, 64, 67, 123, 58, 122, 113, 53 ] },
    // 67: { id: '67', label: `Girth, Height and Volume for Black Cherry Trees`, data: [ 84, 129, 93, 102, 121, 52, 37, 55, 127, 111, 99, 54, 127, 111, 99, 54 ] },
    // 68: { id: '68', label: `Populations Recorded by the US Census`, data: [ 107, 45, 62, 80, 102, 117, 41, 40, 84, 129, 93, 102, 121, 52, 37, 55 ] },
    // 69: { id: '69', label: `Topographic Information on Auckland's Maunga Whau Volcano`, data: [ 116, 57, 50, 131, 100, 67, 18, 66, 104, 44, 40, 100, 108, 89, 86, 56 ] },
    // 70: { id: '70', label: `The Number of Breaks in Yarn during Weaving`, data: [ 30, 118, 69, 78, 20, 76, 68, 127, 36, 77, 3, 120, 81, 18, 116, 57 ] },
    // 71: { id: '71', label: `Average Heights and Weights for American Women`, data: [ 69, 78, 74, 130, 110, 34, 85, 24, 64, 46, 108, 89, 130, 6, 54, 58 ] },
    // 72: { id: '72', label: `Monthly Excess Returns`, data: [ 65, 91, 10, 82, 48, 95, 124, 11, 18, 66, 87, 3, 90, 28, 115, 59 ] },
    // 73: { id: '73', label: `Delay in AIDS Reporting in England and Wales`, data: [ 57, 86, 119, 35, 131, 114, 47, 39, 9, 62, 44, 19, 26, 69, 114, 60 ] },
    // 74: { id: '74', label: `Failures of Air-conditioning Equipment`, data: [ 73, 96, 90, 28, 94, 51, 109, 14, 70, 8, 33, 71, 71, 36, 91, 61 ] },
    // 75: { id: '75', label: `Failures of Air-conditioning Equipment`, data: [ 4, 93, 4, 93, 10, 82, 89, 106, 60, 7, 132, 79, 42, 30, 9, 62 ] },
    // 76: { id: '76', label: `Car Speeding and Warning Signs`, data: [ 124, 11, 77, 107, 6, 13, 98, 41, 103, 65, 59, 84, 88, 15, 80, 63 ] },
    // 77: { id: '77', label: `Remission Times for Acute Myelogenous Leukaemia`, data: [ 25, 108, 120, 115, 96, 37, 12, 12, 86, 56, 6, 13, 59, 84, 31, 64 ] },
    // 78: { id: '78', label: `Population of U.S. Cities`, data: [ 115, 59, 106, 68, 72, 112, 28, 27, 58, 122, 113, 53, 51, 16, 103, 65 ] },
    // 93: { id: '93', label: `Darwin's Plant Height Differences`, data: [ 52, 126, 110, 34, 36, 77, 3, 120, 116, 57, 50, 131, 100, 67, 18, 66 ] },
    // 94: { id: '94', label: `Cardiac Data for Domestic Dogs`, data: [ 98, 41, 36, 77, 61, 116, 111, 47, 19, 9, 46, 132, 80, 63, 100, 67 ] },
    // 95: { id: '95', label: `Incidence of Down's Syndrome in British Columbia`, data: [ 89, 106, 63, 113, 129, 87, 128, 29, 16, 101, 5, 73, 115, 59, 106, 68 ] },
    // 96: { id: '96', label: `Behavioral and Plumage Characteristics of Hybrid Ducks`, data: [ 14, 119, 104, 44, 84, 129, 93, 102, 33, 71, 123, 104, 21, 81, 26, 69 ] },
    // 164: { id: '164', label: `Example Data of Antille and May - for Simple Regression`, data: [ 83, 38, 130, 6, 7, 22, 17, 32, 109, 14, 97, 88, 128, 29, 112, 70 ] },
    // 165: { id: '165', label: `Food Stamp Program Participation`, data: [ 36, 77, 3, 120, 81, 18, 116, 57, 1, 72, 79, 21, 70, 8, 33, 71 ] },
    // 168: { id: '168', label: `Waterflow Measurements of Kootenay River in Libby and Newgate`, data: [ 49, 43, 102, 117, 122, 48, 21, 81, 39, 125, 30, 118, 92, 26, 1, 72 ] },
    // 176: { id: '176', label: `Satellite Radar Image Data from near Munich`, data: [ 100, 67, 18, 66, 75, 2, 53, 99, 63, 113, 81, 18, 16, 101, 5, 73 ] },
    // 178: { id: '178', label: `Hertzsprung-Russell Diagram Data of Star Cluster CYG OB1`, data: [ 129, 87, 128, 29, 28, 27, 72, 112, 22, 33, 127, 111, 27, 5, 101, 74 ] },
    // 179: { id: '179', label: `Number of International Calls from Belgium`, data: [ 31, 64, 67, 123, 58, 122, 113, 53, 79, 21, 2, 20, 56, 42, 126, 75 ] },
    // 181: { id: '181', label: `Vaso Constriction Skin Data Set`, data: [ 77, 107, 22, 33, 25, 108, 120, 115, 75, 2, 53, 99, 29, 50, 20, 76 ] },
    // 183: { id: '183', label: `Modified Data on Wood Specific Gravity`, data: [ 5, 73, 45, 98, 124, 11, 77, 107, 53, 99, 19, 9, 98, 41, 36, 77 ] },
    // 185: { id: '185', label: `Experimenter Expectations`, data: [ 23, 110, 35, 124, 11, 109, 95, 23, 110, 34, 85, 24, 30, 118, 69, 78 ] },
    // 186: { id: '186', label: `Moral Integration of American Cities`, data: [ 40, 100, 16, 101, 46, 132, 71, 36, 78, 31, 56, 42, 60, 7, 132, 79 ] },
    // 187: { id: '187', label: `U. S. State Public-School Expenditures`, data: [ 74, 130, 76, 10, 112, 70, 27, 5, 112, 70, 27, 5, 107, 45, 62, 80 ] },
    // 188: { id: '188', label: `Methods of Teaching Reading Comprehension`, data: [ 27, 5, 101, 74, 1, 72, 79, 21, 49, 43, 102, 117, 122, 48, 21, 81 ] },
    // 189: { id: '189', label: `Canadian Women's Labour-Force Participation`, data: [ 102, 117, 41, 40, 44, 19, 83, 38, 47, 39, 14, 119, 65, 91, 10, 82 ] },
    // 190: { id: '190', label: `Exercise Histories of Eating-Disordered and Control Subjects`, data: [ 42, 30, 9, 62, 74, 130, 76, 10, 90, 28, 115, 59, 32, 25, 66, 83 ] },
    // 191: { id: '191', label: `Fraudulent Data on IQs of Twins Raised Apart`, data: [ 46, 132, 71, 36, 69, 78, 74, 130, 45, 98, 25, 108, 103, 65, 59, 84 ] },
    // 193: { id: '193', label: `Voting Intentions in the 1988 Chilean Plebiscite`, data: [ 12, 12, 23, 110, 126, 75, 39, 125, 62, 80, 107, 45, 54, 58, 34, 85 ] },
    // 194: { id: '194', label: `The 1907 Romanian Peasant Rebellion`, data: [ 2, 20, 49, 43, 67, 123, 70, 8, 55, 97, 13, 49, 85, 24, 57, 86 ] },
    // 268: { id: '268', label: `Budget Shares for Italian Households`, data: [ 75, 2, 53, 99, 29, 50, 20, 76, 122, 48, 21, 81, 5, 73, 45, 98 ] },
    // 269: { id: '269', label: `Budget Shares of British Households`, data: [ 64, 46, 108, 89, 130, 6, 54, 58, 100, 67, 18, 66, 75, 2, 53, 99 ] },
    // 270: { id: '270', label: `Wages in Belgium`, data: [ 50, 131, 65, 91, 66, 83, 117, 1, 91, 61, 82, 94, 104, 44, 40, 100 ] },
    // 271: { id: '271', label: `Earnings from the Current Population Survey`, data: [ 118, 4, 105, 103, 95, 23, 129, 87, 71, 36, 91, 61, 40, 100, 16, 101 ] },
    // 272: { id: '272', label: `Growth of CRAN`, data: [ 44, 19, 83, 38, 76, 10, 7, 22, 14, 119, 104, 44, 84, 129, 93, 102 ] },
    // 274: { id: '274', label: `Stated Preferences for Car Choice`, data: [ 68, 127, 121, 52, 8, 121, 78, 31, 114, 60, 8, 121, 118, 4, 105, 103 ] },
    // 275: { id: '275', label: `The California Test Score Data Set`, data: [ 66, 83, 117, 1, 18, 66, 87, 3, 38, 90, 58, 122, 33, 71, 123, 104 ] },
    // 276: { id: '276', label: `Choice of Brand for Catsup`, data: [ 122, 48, 21, 81, 5, 73, 45, 98, 21, 81, 26, 69, 35, 124, 125, 105 ] },
    // 277: { id: '277', label: `Cigarette Consumption`, data: [ 13, 49, 52, 126, 111, 47, 48, 95, 4, 93, 4, 93, 10, 82, 89, 106 ] },
    // 278: { id: '278', label: `The Cigarette Consumption Panel Data Set`, data: [ 72, 112, 28, 27, 78, 31, 56, 42, 5, 73, 45, 98, 124, 11, 77, 107 ] },
    // 289: { id: '289', label: `Cost Function for Electricity Producers`, data: [ 45, 98, 25, 108, 103, 65, 59, 84, 123, 104, 88, 15, 45, 98, 25, 108 ] },
    // 291: { id: '291', label: `Drunk Driving Laws and Traffic Deaths`, data: [ 34, 85, 32, 25, 38, 90, 58, 122, 29, 50, 20, 76, 132, 79, 11, 109 ] },
    // 293: { id: '293', label: `Exchange Rates of US Dollar Against Other Currencies`, data: [ 132, 79, 11, 109, 9, 62, 44, 19, 28, 27, 72, 112, 12, 12, 23, 110 ] },
    // 326: { id: '326', label: `Panel Survey of Income Dynamics`, data: [ 126, 75, 39, 125, 79, 21, 2, 20, 3, 120, 38, 90, 22, 33, 127, 111 ] },
    // 327: { id: '327', label: `Labor Force Participation`, data: [ 60, 7, 132, 79, 42, 30, 9, 62, 129, 87, 128, 29, 28, 27, 72, 112 ] },
    // 328: { id: '328', label: `Dynamic Relation Between Patents and R&D`, data: [ 63, 113, 81, 18, 16, 101, 5, 73, 95, 23, 129, 87, 89, 106, 63, 113 ] },
    // 329: { id: '329', label: `Patents, R&D and Technological Spillovers for a Panel of Firms`, data: [ 99, 54, 118, 4, 123, 104, 88, 15, 37, 55, 61, 116, 43, 128, 131, 114 ] },
    // 341: { id: '341', label: `Households Tobacco Budget Share`, data: [ 104, 44, 40, 100, 108, 89, 86, 56, 77, 107, 22, 33, 25, 108, 120, 115 ] },
    // 342: { id: '342', label: `Stated Preferences for Train Traveling`, data: [ 78, 31, 56, 42, 60, 7, 132, 79, 113, 53, 42, 30, 37, 55, 61, 116 ] },
    // 343: { id: '343', label: `Statewide Data on Transportation Equipment Manufacturing`, data: [ 6, 13, 98, 41, 41, 40, 24, 17, 97, 88, 15, 92, 49, 43, 102, 117 ] },
    // 344: { id: '344', label: `Evaluating Treatment Effect of Training on Earnings`, data: [ 131, 114, 47, 39, 82, 94, 122, 48, 101, 74, 92, 26, 39, 125, 30, 118 ] },
    // 345: { id: '345', label: `Choice of Brand for Tuna`, data: [ 128, 29, 112, 70, 19, 9, 46, 132, 130, 6, 54, 58, 47, 39, 14, 119 ] },
    // 346: { id: '346', label: `US Finance Industry Profits`, data: [ 39, 125, 30, 118, 92, 26, 1, 72, 52, 126, 110, 34, 36, 77, 3, 120 ] },
    // 347: { id: '347', label: `Official Secrecy of the United States Government`, data: [ 54, 58, 34, 85, 17, 32, 64, 46, 108, 89, 86, 56, 114, 60, 8, 121 ] },
    // 348: { id: '348', label: `Standard abbreviations for states of the United States`, data: [ 48, 95, 124, 11, 101, 74, 92, 26, 34, 85, 32, 25, 38, 90, 58, 122 ] },
    // 349: { id: '349', label: `Number of Words in US Tax Law`, data: [ 70, 8, 33, 71, 71, 36, 91, 61, 121, 52, 37, 55, 31, 64, 67, 123 ] },
    // 350: { id: '350', label: `Unemployment Duration`, data: [ 114, 60, 8, 121, 118, 4, 105, 103, 120, 115, 73, 96, 23, 110, 35, 124 ] },
    // 352: { id: '352', label: `Provision of University Teaching and Research`, data: [ 51, 16, 103, 65, 14, 119, 104, 44, 12, 12, 23, 110, 126, 75, 39, 125 ] },
    // 353: { id: '353', label: `Medical Expenses in Viet-nam (household Level)`, data: [ 16, 101, 5, 73, 115, 59, 106, 68, 20, 76, 68, 127, 13, 49, 52, 126 ] },
    // 354: { id: '354', label: `Medical Expenses in Viet-nam (individual Level)`, data: [ 26, 69, 114, 60, 113, 53, 42, 30, 30, 118, 69, 78, 20, 76, 68, 127 ] },
    // 355: { id: '355', label: `Panel Datas of Individual Wages`, data: [ 112, 70, 27, 5, 107, 45, 62, 80, 76, 10, 7, 22, 117, 1, 43, 128 ] },
    // 356: { id: '356', label: `Wages, Experience and Schooling`, data: [ 82, 94, 122, 48, 120, 115, 73, 96, 119, 35, 29, 50, 24, 17, 84, 129 ] },
    // 358: { id: '358', label: `Yen-dollar Exchange Rate`, data: [ 9, 62, 44, 19, 26, 69, 114, 60, 46, 132, 71, 36, 69, 78, 74, 130 ] },
    // 359: { id: '359', label: `Choice of Brand for Yogurts`, data: [ 21, 81, 26, 69, 35, 124, 125, 105, 87, 3, 94, 51, 116, 57, 50, 131 ] },
    { userId: "101", _id: '360', label: `EMG Reading 2/15`, data: [ 41, 46, 41, 31, 38, 30, 36, 45, 50, 37, 37, 42, 41, 46, 35, 39, 50, 49, 34, 46, 49, 37, 48, 34, 31, 50, 49, 32, 39, 43, 46, 35, 31, 31, 34, 33, 48, 41, 30, 45, 43, 45, 31, 48, 44, 43, 31, 42, 44, 38, 30, 36, 33, 40, 36, 41, 35, 49, 41, 35, 44, 32, 31, 42, 45, 31, 43, 41, 35, 48, 39, 43, 47, 48, 45, 41, 50, 48, 45, 30, 39, 50, 47, 50, 31, 49, 39, 33, 50, 48, 40, 35, 46, 34, 35, 33, 41, 44, 39, 35, 39, 43, 39, 37, 34, 37, 45, 39, 44, 40, 50, 49, 48, 48, 47, 39, 50, 33, 43, 33, 44, 48, 34, 44, 46, 37, 39, 33, 33, 43, 50, 33, 35, 40, 41, 48, 44, 39, 48, 47, 37, 38, 39, 35, 39, 38, 33, 33, 40, 30, 44, 48, 45, 34, 47, 48, 50, 38, 41, 44, 34, 42, 50, 39, 39, 40, 46, 43, 45, 48, 40, 41, 38, 43, 48, 40, 48, 37, 32, 37, 35, 37, 43, 36, 50, 48, 42, 48, 31, 33, 47, 34, 43, 46, 48, 48, 46, 34, 41, 32, 34, 42, 48, 41, 36, 43, 35, 49, 38, 38, 38, 32, 43, 42, 37, 39, 50, 36, 39, 35, 46, 50, 50, 33, 49, 32, 40, 38, 31, 47, 46, 34, 37, 43, 46, 44, 49, 45, 50, 33, 30, 30, 49, 49, 35, 35, 30, 49, 31, 48, 49, 42, 48, 46, 49, 41, 42, 43, 36, 31, 41, 43, 50, 32, 50, 43, 36, 35, 33, 47, 44, 46, 42, 41, 47, 43, 32, 43, 45, 31, 30, 44, 30, 33, 30, 32, 36, 44, 45, 42, 46, 43, 43, 46, 32, 34, 48, 41, 44, 36, 30, 32, 31, 34, 34, 36, 44, 46, 49, 37, 36, 31, 45, 45, 48, 38, 39, 47, 33, 48, 40, 39, 37, 49, 46, 34, 42, 31, 49, 37, 49, 32, 50, 40, 31, 38, 30, 40, 40, 48, 39, 33, 37, 36, 37, 39, 50, 39, 45, 37, 42, 34, 46, 37, 36, 30, 32, 30, 49, 45, 31, 37, 30, 33, 35, 43, 43, 46, 48, 39, 34, 50, 45, 31, 30, 41, 49, 37, 48, 30, 50, 37, 31, 36, 39, 33, 48, 31, 46, 37, 50, 45, 31, 44, 49, 44, 49, 37, 36, 38, 39, 49, 32, 30, 39, 33, 46, 30, 47, 32, 31, 41, 42, 38, 30, 50, 37, 34, 41, 33, 49, 42, 40, 47, 34, 48, 35, 40, 44, 46, 48, 47, 48, 36, 40, 38, 41, 45, 42, 37, 42, 36, 48, 49, 34, 47, 30, 40, 31, 43, 40, 49, 35, 38, 38, 41, 50, 40, 37, 50, 37, 35, 31, 30, 42, 40, 43, 38, 31, 43, 46, 37, 49, 39, 42, 40, 43, 42, 39, 50, 40, 34, 35, 31, 33, 49, 37, 49, 37, 48, 40, 50, 47, 48, 34, 49, 46, 37, 37, 44, 49, 30, 45, 39, 42, 31, 39, 43, 31, 44, 43, 48, 48, 45, 45, 36, 37, 43, 48, 40, 41, 49, 32, 33, 42, 30, 43, 38, 33, 31, 46, 33, 49, 50, 32, 43, 36, 49, 46, 47, 32, 43, 34, 47, 42, 49, 47, 41, 46, 49, 31, 34, 37, 39, 48, 46, 46, 49, 43, 35, 39, 36, 41, 41, 42, 35, 49, 42, 38, 42, 40, 47, 47, 45, 43, 34, 35, 45, 45, 47, 49, 48, 41, 45, 49, 42, 42, 31, 41, 50, 42, 48, 50, 44, 31, 45, 41, 49, 48, 39, 34, 38, 37, 38, 35, 38, 40, 33, 49, 48, 50, 30, 50, 45, 30, 38, 45, 37, 46, 49, 49, 46, 35, 31, 35, 41, 33, 36, 42, 48, 35, 30, 49, 32, 39, 33, 48, 30, 44, 42, 35, 34, 34, 33, 40, 33, 41, 31, 42, 32, 34, 40, 42, 48, 50, 46, 37, 43, 45, 37, 31, 50, 42, 36, 43, 31, 43, 33, 38, 38, 45, 36, 31, 30, 33, 50, 30, 47, 38, 48, 38, 32, 35, 38, 33, 44, 30, 41, 32, 47, 38, 44, 41, 49, 39, 44, 33, 38, 49, 46, 41, 32, 38, 37, 34, 46, 32, 38, 44, 40, 30, 50, 42, 42, 33, 42, 50, 49, 40, 36, 45, 44, 30, 40, 41, 43, 32, 44, 50, 47, 34, 44, 41, 30, 31, 40, 44, 31, 35, 38, 42, 43, 44, 34, 43, 32, 48, 38, 34, 31, 38, 33, 47, 50, 42, 47, 48, 34, 30, 36, 44, 35, 48, 32, 30, 48, 43, 31, 35, 40, 41, 47, 32, 32, 39, 45, 32, 41, 36, 35, 47, 46, 44, 38, 38, 37, 36, 39, 43, 47, 39, 31, 49, 35, 37, 33, 48, 42, 42, 40, 50, 50, 44, 41, 36, 31, 48, 43, 34, 37, 46, 31, 31, 49, 35, 33, 34, 41, 35, 49, 34, 30, 31, 33, 36, 47, 37, 43, 40, 43, 35, 30, 32, 43, 33, 49, 34, 42, 37, 37, 47, 50, 50, 44, 46, 50, 30, 38, 36, 33, 47, 39, 33, 44, 33, 48, 34, 31, 41, 41, 46, 31, 36, 47, 43, 49, 39, 34, 39, 46, 44, 47, 49, 32, 32, 32, 45, 34, 31, 45, 34, 33, 31, 50, 32, 39, 45, 32, 50, 47, 47, 36, 34, 38, 38, 30, 49, 37, 48, 44, 49, 43, 36, 40, 39, 36, 46, 43, 40, 48, 35, 43, 43, 37, 33, 47, 45, 35, 32, 43, 43, 35, 30, 35, 38, 32, 50, 32, 50, 50, 40, 39, 30, 48, 39, 49, 38, 41, 37, 32, 40, 37, 38, 35, 40, 35, 31, 47, 36, 38, 38, 47, 41, 48, 50, 32, 35, 48, 35, 35, 47, 41, 36, 42, 38, 34, 43, 36, 31, 46, 42, 42, 44, 46, 46, 41, 44, 45, 42, 30, 31, 50, 32, 44, 41, 38, 31, 39, 48, 35, 41, 33, 46, 44, 42, 48, 39, 40, 50, 48 ], time: "100", timeStamp: "2024-04-08T01:33:23.148Z" },
    { userId: "101", _id: '361', label: `EMG Reading 2/14`, data: [ 36, 38, 37, 40, 49, 33, 32, 39, 46, 30, 41, 45, 31, 42, 44, 43, 36, 38, 37, 40, 49, 33, 32, 39, 46, 30, 41, 45, 31, 42, 44, 43 ], time: "100", timeStamp: "2024-04-08T01:33:23.148Z" },
    {data: [33, 32, 39, 46, 30, 41, 45, 31, 42, 44, 43, 36, 38, 37, 40, 49, 33],label: "Another dataset 1",time: "100",timeStamp: "2024-04-08T01:33:23.148Z",userId: "101",_id: "66134963c3e0e5cf8c1dd950"},
    {data: [38, 30, 36, 45, 50, 37, 37, 42, 41, 46, 35, 39, 50, 49, 36, 38, 37],label: "Another dataset 2",time: "100",timeStamp: "2024-04-08T01:41:57.719Z",userId: "101",_id: "66134b65c3e0e5cf8c1dd951"},
    {data: [46, 35, 39, 50, 49, 34, 46, 49, 37, 48, 34, 31, 50, 49, 32, 39, 28],label: "Another dataset 3",time: "100",timeStamp: "2024-04-10T13:46:29.794Z",userId: "101",_id: "661698353f5e530d94501769"}
    // 757: { id: '757', label: `Reaction times in a sleep deprivation study`, data: [ 19, 9, 46, 132, 80, 63, 100, 67, 128, 29, 112, 70, 19, 9, 46, 132 ] },
];

const options = {
  method: "GET",
  url: "https://express-sessions-api.onrender.com/sessions/661698353f5e530d94501769",
  headers: { "authorization": "Bearer TOKEN" },
};

axios(options)
  .then(response => {
    console.log(response.data)
    datasets.push(response.data)
    console.log(datasets)
    return datasets
  })
  .catch(error => {
    console.log(error);
  });
  function pushData(x){
    datasets.unshift(x);
    return 20;
  }

  async function pushData2(x){
    const y = await pushData(x);
  }

  export const fetchDatasets = async () => {
    axios(options)
  .then(response => {
    console.log(response.data)
    pushData2(response.data)
    console.log(datasets)
    return datasets
  })
  .catch(error => {
    console.log(error);
  });
}
export const data = Object.keys(datasets).map((_id) => datasets[_id]);

export const related = data.slice(-5);

export const idx = lunr(function() {
  this.field("label");
});

data.forEach((d) => idx.add(d));

export default datasets;
