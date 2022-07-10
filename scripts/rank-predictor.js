function findJeeMainsRank() {
  percentile = getJeeMainsPercentile();
  Cat = getCategory();

  if (isNotValidPercentile(percentile)) {
    Error("Enter a valid Percentile");
    return;
  }

  CRL_rank = getRank(CRL, percentile);
  Cat_rank = 0;
  switch (Cat) {
    case "GEN":
      Cat_rank = getRank(CRL, percentile);
      break;
    case "EWS":
      Cat_rank = getRank(EWS, percentile);
      break;
    case "OBC":
      Cat_rank = getRank(OBC, percentile);
      break;
    case "SC":
      Cat_rank = getRank(SC, percentile);
      break;
    case "ST":
      Cat_rank = getRank(ST, percentile);
      break;
    default:
      Cat_rank = getRank(CRL, percentile);
      break;
  }
  showResults(CRL_rank, Cat, Cat_rank, percentile);
}

function getJeeMainsPercentile() {
  return document.getElementById("jeemainspercentile").value;
}

function getCategory() {
  categories = ["GEN", "OBC", "SC", "ST", "EWS"];
  for (let cat = 0; cat < categories.length; cat++) {
    if (document.getElementById(categories[cat]).checked) {
      return categories[cat];
    }
  }
  return "NA";
}
function isNotValidPercentile(percentile) {
  if ((isNaN(percentile) && percentile > 100) || percentile <= 0) {
    return true;
  }
  return false;
}
function getRank(data, percentile) {
  const idx = getClosestIndex(data.percentile, percentile);
  const L = data?.rank[idx - 1];
  const R = data?.rank[idx + 1];
  const Mean = (L + R + data.rank[idx]) / 3;
  const normalize = (data.rank[idx] + Mean) / 2;
  const error = Math.abs(normalize - data.rank[idx]);
  return [normalize, error];
}

// utility function to get closest index based upon value given
function getClosestIndex(array, value) {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] >= value && array[i + 1] < value) {
      return i;
    }
  }
  return array.length - 1;
}
function showResults(crl, cat, cat_rank, percentile) {
  // initialize loader
  document.getElementById("loading").style.display = "block";
  outputText = document.getElementById("output-logger");
  outputText.innerHTML = "Initializing Predictor...";
  setTimeout(() => {
    outputText.innerHTML = "Input Correct ✓";
    setTimeout(() => {
      outputText.innerHTML = "Percentile Entered = " + percentile + " %";
      setTimeout(() => {
        if (cat === "NA") {
          outputText.innerHTML = "No Category Selected!";
          setTimeout(() => {
            outputText.innerHTML = "Selecting Default Category as : GEN";
            showRank(crl, cat_rank, outputText);
          }, 1000);
        } else {
          outputText.innerHTML = "Selected Category : " + cat;
          showRank(crl, cat_rank, outputText);
        }
      }, 1000);
    }, 1000);
  }, 1000);
}

function showRank(crl, cat_rl, out) {
  L_crl = parseInt(crl[0] - crl[1]);
  R_crl = parseInt(crl[0] + crl[1]);

  L_cat_rl = parseInt(cat_rl[0] - cat_rl[1]);
  R_cat_rl = parseInt(cat_rl[0] + cat_rl[1]);
  setTimeout(() => {
    out.innerHTML = "Importing Data";
    setTimeout(() => {
      out.innerHTML = "Normalizing Data to get increasing accuracy";
      setTimeout(() => {
        out.innerHTML =
          "Your CRL Rank is : " +
          L_crl +
          " - " +
          R_crl +
          ", Your Category Rank is : " +
          L_cat_rl +
          " - " +
          R_cat_rl;
        document.getElementById("loading").style.display = "none";
      }, 1000);
    }, 2000);
  }, 1000);
}

//  funtion to handel errors
function Error(error) {
  alert = document.getElementById("error-load");
  alertText = document.getElementById("error-load-text");
  alert.style.display = "block";
  alertText.innerHTML = error;
  setTimeout(() => {
    alert.style.display = "none";
    alertText.innerHTML = "";
  }, 5000);
}

const CRL = {
  percentile: [
    100, 99.997, 99.991, 99.97, 99.95, 99.93, 99.91, 99.9, 99.87, 99.86, 99.85,
    99.84, 99.83, 99.82, 99.81, 99.79, 99.78, 99.77, 99.75, 99.72, 99.71, 99.7,
    99.69, 99.68, 99.67, 99.66, 99.64, 99.63, 99.62, 99.61, 99.6, 99.59, 99.58,
    99.56, 99.55, 99.54, 99.53, 99.49, 99.48, 99.46, 99.45, 99.44, 99.41, 99.39,
    99.37, 99.35, 99.34, 99.33, 99.32, 99.31, 99.29, 99.28, 99.27, 99.26, 99.25,
    99.24, 99.22, 99.21, 99.2, 99.19, 99.17, 99.14, 99.13, 99.11, 99.09, 99.08,
    99.07, 99.05, 99.04, 99.03, 99.02, 99.01, 98.9, 98.8, 98.7, 98.6, 98.5,
    98.4, 98.3, 98.2, 98.1, 98, 97.9, 97.8, 97.7, 97.6, 97.5, 97.4, 97.3, 97.2,
    97.1, 97, 96.9, 96.8, 96.7, 96.6, 96.5, 96.4, 96.3, 96.2, 96.1, 96, 95.9,
    95.8, 95.7, 95.6, 95.5, 95.4, 95.3, 95.2, 95.1, 95, 94, 93, 92, 91, 90, 89,
    88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
    69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32,
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13,
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ],
  rank: [
    13, 55, 156, 362, 608, 869, 1086, 1193, 1529, 1624, 1743, 1860, 1970, 2079,
    2175, 2406, 2509, 2622, 2823, 3154, 3260, 3357, 3470, 3552, 3649, 3751,
    3958, 4055, 4161, 4266, 4377, 4469, 4574, 4760, 4857, 4951, 5068, 5447,
    5566, 5766, 5848, 5949, 6240, 6429, 6612, 6816, 6912, 6985, 7078, 7163,
    7366, 7500, 7570, 7670, 7761, 7850, 8033, 8125, 8201, 8302, 8472, 8774,
    8871, 9099, 9266, 9374, 9462, 9670, 9767, 9831, 9928, 10028, 10600, 11519,
    12459, 13339, 14234, 15197, 16114, 17021, 17922, 18827, 19718, 20627, 21543,
    22415, 23297, 24198, 25022, 25874, 26735, 27598, 28475, 29331, 30134, 31020,
    31848, 32690, 33490, 34244, 35107, 36015, 36860, 37707, 38554, 39432, 40244,
    41079, 41954, 42793, 43676, 44522, 49106, 57507, 65964, 74444, 83118, 91857,
    100682, 109565, 118540, 127787, 137365, 146723, 156746, 166868, 176429,
    186363, 196667, 207320, 218020, 228418, 238867, 249326, 259476, 270383,
    281274, 291638, 302499, 313090, 322924, 333491, 344025, 354002, 364184,
    374203, 383857, 394081, 404812, 413747, 422964, 433605, 443486, 452986,
    460999, 470229, 481140, 489390, 498188, 507771, 516196, 525071, 533230,
    542627, 551637, 559759, 567918, 575540, 584367, 592745, 600188, 608635,
    616563, 624311, 632389, 639217, 647438, 655014, 661680, 669042, 676403,
    683643, 690567, 697454, 704811, 712248, 718720, 724794, 731938, 738197,
    744978, 751750, 757851, 763906, 769956, 776110, 782368, 788314, 794350,
    799784, 805226, 811391, 816860, 822663, 828720, 834501, 840477,
  ],
};
const EWS = {
  percentile: [
    100, 99.997, 99.991, 99.97, 99.95, 99.93, 99.91, 99.9, 99.87, 99.86, 99.85,
    99.84, 99.83, 99.82, 99.81, 99.79, 99.78, 99.77, 99.75, 99.72, 99.71, 99.7,
    99.69, 99.68, 99.67, 99.66, 99.64, 99.63, 99.62, 99.61, 99.6, 99.59, 99.58,
    99.56, 99.55, 99.54, 99.53, 99.49, 99.48, 99.46, 99.45, 99.44, 99.41, 99.39,
    99.37, 99.35, 99.34, 99.33, 99.32, 99.31, 99.29, 99.28, 99.27, 99.26, 99.25,
    99.24, 99.22, 99.21, 99.2, 99.19, 99.17, 99.14, 99.13, 99.11, 99.09, 99.08,
    99.07, 99.05, 99.04, 99.03, 99.02, 99.01, 98.9, 98.8, 98.7, 98.6, 98.5,
    98.4, 98.3, 98.2, 98.1, 98, 97.9, 97.8, 97.7, 97.6, 97.5, 97.4, 97.3, 97.2,
    97.1, 97, 96.9, 96.8, 96.7, 96.6, 96.5, 96.4, 96.3, 96.2, 96.1, 96, 95.9,
    95.8, 95.7, 95.6, 95.5, 95.4, 95.3, 95.2, 95.1, 95, 94, 93, 92, 91, 90, 89,
    88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
    69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32,
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13,
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ],
  rank: [
    1, 3, 12, 37, 52, 78, 109, 113, 153, 163, 180, 196, 205, 220, 228, 241, 249,
    265, 283, 324, 335, 347, 359, 367, 377, 390, 427, 436, 446, 468, 471, 478,
    494, 528, 531, 547, 569, 611, 615, 652, 669, 683, 724, 751, 782, 803, 822,
    829, 847, 863, 889, 910, 920, 934, 946, 961, 987, 1005, 1014, 1022, 1052,
    1101, 1110, 1148, 1175, 1187, 1209, 1243, 1249, 1255, 1275, 1285, 1370,
    1504, 1641, 1776, 1898, 2059, 2210, 2349, 2480, 2629, 2766, 2899, 3047,
    3208, 3339, 3483, 3634, 3785, 3928, 4069, 4223, 4360, 4489, 4632, 4746,
    4886, 4997, 5120, 5250, 5398, 5521, 5655, 5788, 5925, 6062, 6193, 6343,
    6483, 6598, 6745, 7453, 8723, 10015, 11289, 12597, 13912, 15174, 16426,
    17731, 19063, 20387, 21671, 23053, 24395, 25637, 26916, 28215, 29526, 30802,
    31989, 33175, 34328, 35434, 36653, 37817, 38938, 40068, 41139, 42171, 43237,
    44275, 45206, 46235, 47237, 48124, 49067, 50069, 50871, 51685, 52682, 53557,
    54388, 55049, 55802, 56709, 57387, 58083, 58895, 59554, 60295, 60980, 61698,
    62386, 63007, 63570, 64163, 64804, 65408, 65954, 66538, 67125, 67677, 68298,
    68760, 69337, 69869, 70310, 70783, 71295, 71775, 72133, 72570, 73000, 73575,
    73884, 74220, 74657, 75047, 75411, 75789, 76122, 76427, 76738, 77167, 77531,
    77713, 78058, 78316, 78616, 78841, 79211, 79468, 79750, 80001, 80278,
  ],
};
const OBC = {
  percentile: [
    99.995, 99.991, 99.98, 99.97, 99.96, 99.95, 99.94, 99.93, 99.92, 99.91,
    99.9, 99.89, 99.88, 99.86, 99.85, 99.84, 99.83, 99.82, 99.81, 99.8, 99.78,
    99.77, 99.76, 99.74, 99.73, 99.72, 99.71, 99.7, 99.69, 99.68, 99.67, 99.66,
    99.65, 99.64, 99.63, 99.62, 99.61, 99.58, 99.57, 99.56, 99.55, 99.54, 99.53,
    99.52, 99.51, 99.5, 99.49, 99.48, 99.47, 99.46, 99.44, 99.43, 99.42, 99.41,
    99.4, 99.39, 99.38, 99.37, 99.36, 99.35, 99.34, 99.33, 99.32, 99.3, 99.29,
    99.28, 99.27, 99.26, 99.24, 99.23, 99.22, 99.21, 99.2, 99.19, 99.17, 99.15,
    99.14, 99.13, 99.12, 99.11, 99.09, 99.08, 99.07, 99.06, 99.05, 99.04, 99.03,
    99.02, 99.01, 99, 98.9, 98.8, 98.7, 98.6, 98.5, 98.4, 98.3, 98.2, 98.1, 98,
    97.9, 97.8, 97.7, 97.6, 97.5, 97.4, 97.3, 97.2, 97.1, 97, 96.9, 96.8, 96.7,
    96.6, 96.5, 96.4, 96.3, 96.2, 96.1, 96, 95.9, 95.8, 95.7, 95.6, 95.5, 95.4,
    95.3, 95.2, 95.1, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
    81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63,
    62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44,
    43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25,
    24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5,
    4, 3, 2, 1, 0,
  ],
  rank: [
    10, 17, 38, 46, 73, 90, 119, 123, 155, 173, 192, 209, 233, 259, 284, 296,
    311, 327, 361, 381, 422, 436, 449, 488, 501, 528, 533, 554, 572, 592, 617,
    643, 657, 678, 692, 717, 733, 783, 805, 833, 849, 869, 885, 911, 932, 944,
    961, 980, 992, 1019, 1052, 1089, 1105, 1130, 1136, 1157, 1180, 1190, 1213,
    1241, 1267, 1280, 1297, 1335, 1358, 1375, 1388, 1408, 1447, 1464, 1492,
    1510, 1522, 1547, 1582, 1625, 1638, 1666, 1684, 1702, 1740, 1769, 1788,
    1796, 1840, 1862, 1876, 1904, 1927, 1952, 2060, 2275, 2519, 2715, 2947,
    3190, 3418, 3631, 3872, 4102, 4330, 4574, 4831, 5070, 5293, 5543, 5770,
    6003, 6232, 6460, 6700, 6938, 7171, 7452, 7671, 7908, 8139, 8365, 8628,
    8877, 9143, 9379, 9630, 9870, 10107, 10346, 10577, 10811, 11093, 11331,
    12704, 15261, 17840, 20479, 23283, 26110, 28964, 31845, 34802, 37842, 41054,
    44226, 47676, 51164, 54458, 57849, 61335, 65039, 68792, 72401, 76103, 79887,
    83505, 87422, 91381, 95125, 99073, 103023, 106693, 110570, 114454, 118165,
    122003, 125789, 129361, 133234, 137238, 140599, 144134, 148203, 152037,
    155704, 158732, 162267, 166455, 169638, 173049, 176780, 180074, 183478,
    186581, 190238, 193712, 196831, 200075, 203040, 206395, 209668, 212568,
    215892, 219094, 222116, 225382, 228016, 231370, 234344, 236964, 239977,
    242823, 245699, 248502, 251405, 254247, 257361, 259981, 262427, 265327,
    267792, 270611, 273376, 275848, 278282, 280931, 283422, 286058, 288484,
    290961, 293206, 295430, 298015, 300296, 302716, 305245, 307706, 310231,
  ],
};
const SC = {
  percentile: [
    99.97, 99.95, 99.76, 99.72, 99.59, 99.57, 99.56, 99.55, 99.44, 99.36, 99.33,
    99.3, 99.21, 99.15, 99.14, 99.12, 99.11, 99.05, 99.02, 98.9, 98.8, 98.7,
    98.6, 98.5, 98.4, 98.3, 98.2, 98.1, 98, 97.9, 97.8, 97.7, 97.6, 97.5, 97.4,
    97.3, 97.2, 97.1, 97, 96.9, 96.8, 96.6, 96.5, 96.4, 96.3, 96.2, 96.1, 96,
    95.9, 95.8, 95.7, 95.6, 95.5, 95.4, 95.2, 95.1, 95, 94, 93, 92, 91, 90, 89,
    88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70,
    69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51,
    50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32,
    31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13,
    12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ],
  rank: [
    3, 11, 41, 50, 76, 81, 82, 87, 101, 117, 122, 129, 147, 157, 159, 163, 165,
    178, 182, 198, 224, 237, 250, 269, 295, 319, 349, 372, 386, 419, 449, 472,
    493, 517, 555, 583, 610, 639, 666, 685, 709, 756, 767, 808, 827, 862, 885,
    917, 955, 987, 1015, 1046, 1077, 1098, 1161, 1198, 1238, 1418, 1770, 2172,
    291, 3022, 3483, 3998, 4540, 5105, 5747, 6405, 753, 7746, 8490, 9190, 9984,
    10817, 11704, 12571, 13453, 14444, 15375, 16277, 17332, 18358, 19322, 20367,
    21392, 22359, 23399, 24434, 25467, 26510, 27570, 28616, 29681, 30829, 31784,
    32818, 33995, 35058, 36079, 36951, 37973, 39126, 40045, 41016, 42084, 43077,
    44158, 45044, 46066, 47123, 47996, 48994, 49898, 50985, 51999, 52845, 53800,
    54724, 55679, 56715, 57414, 58355, 59302, 60138, 61008, 61913, 62736, 63537,
    64323, 65147, 66069, 66846, 67613, 68517, 69258, 70146, 70829, 71503, 72280,
    73082, 73902, 74593, 75326, 76032, 76656, 77420, 78198, 78953, 79609, 80585,
    81317, 82167,
  ],
};
const ST = {
  percentile: [
    99.75, 99.06, 98.1, 97.9, 97.4, 97.3, 97.1, 96.8, 96.7, 96.6, 96.3, 96.2,
    95.9, 95.8, 95.7, 95.3, 95.1, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84,
    83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65,
    64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46,
    45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27,
    26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7,
    6, 5, 4, 3, 2, 1, 0,
  ],
  rank: [
    9, 33, 74, 84, 104, 107, 111, 124, 127, 133, 151, 159, 175, 181, 187, 217,
    230, 280, 353, 439, 538, 637, 747, 854, 999, 1161, 1325, 1488, 1665, 1868,
    2093, 2317, 2604, 2848, 3121, 3429, 3727, 4060, 4369, 4712, 5084, 5479,
    5823, 6221, 6638, 7023, 7399, 7863, 8278, 8673, 9114, 9508, 9914, 10351,
    10748, 11110, 11642, 12098, 12534, 12904, 13311, 13766, 14147, 14599, 15073,
    15488, 15905, 16276, 16678, 17106, 17491, 17868, 18240, 18702, 19107, 19448,
    19905, 20238, 20556, 20940, 21309, 21680, 22067, 22398, 22669, 23208, 23540,
    23894, 24221, 24566, 24938, 25300, 25613, 26012, 26297, 26702, 27054, 27281,
    27569, 27978, 28308, 28643, 28976, 29253, 29647, 30009, 30320, 30661, 30986,
    31321, 31600, 32009,
  ],
};
