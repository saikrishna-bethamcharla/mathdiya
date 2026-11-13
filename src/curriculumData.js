export const GRADE_CURRICULUM = {
  3: {
    grade: "Grade 3",
    badge: "Foundational Problem Solving",
    ageRange: "Ages 8–9",
    heroDesc: "Students move past basic memorization to tackle multi-step word problems, place value, and visual fractions.",
    rsAggarwalUnits: [
      { title: "Number Sense & 4-Digit Operations", desc: "Place value to 10,000, expanded form, regrouping, and mental addition & subtraction strategies." },
      { title: "Multiplication Models & Fact Fluency", desc: "Arrays, multiplication facts (1–12), patterns, and word problems." },
      { title: "Division & Equal Sharing", desc: "Sharing models, long division basics, and checking work using multiplication." },
      { title: "Fractions on a Number Line", desc: "Fraction strips, comparing fractions with like denominators, and equivalent fractions." },
      { title: "Measurement & 2D Geometry", desc: "Perimeter calculations, US customary & metric units, time intervals, and money." }
    ],
    staarFocus: [
      "Solving 1- and 2-step word problems (TEKS 3.4K, 3.5B)",
      "Reading scaled pictographs, dot plots, and bar graphs",
      "Representing fractions between 0 and 1 on number lines",
      "Decomposing shapes to find perimeter without standard formulas"
    ],
    sampleQuestion: {
      question: "Maya has 4 bags of marbles. Each bag has 15 red marbles and 9 blue marbles. How many marbles does Maya have in total?",
      options: ["96 marbles", "84 marbles", "60 marbles", "102 marbles"],
      correctIndex: 0,
      explanation: "Each bag contains 15 + 9 = 24 marbles. Across 4 bags: 4 × 24 = 96 marbles."
    },
    weeklySchedule: "Tuesdays & Thursdays • 5:00 PM – 6:00 PM CST (Alternative weekend slots available)"
  },
  4: {
    grade: "Grade 4",
    badge: "Multi-Step Thinking",
    ageRange: "Ages 9–10",
    heroDesc: "Multi-digit multiplication, division with remainders, decimal place values, and angle measurements.",
    rsAggarwalUnits: [
      { title: "Multi-Digit Multiplication", desc: "Area models, standard algorithms, and estimation up to 4-digit by 1-digit and 2-digit by 2-digit." },
      { title: "Long Division & Interpreting Remainders", desc: "Single-digit divisors and understanding what a remainder means in real situations." },
      { title: "Fractions & Decimals", desc: "Adding fractions with denominators of 10 and 100; converting tenths and hundredths to decimals." },
      { title: "Factors, Multiples & Prime Numbers", desc: "Factor trees, prime factorization, and divisibility rules." },
      { title: "Angles & Geometric Properties", desc: "Using a protractor, finding adjacent angles, symmetry, and parallel vs. perpendicular lines." }
    ],
    staarFocus: [
      "Interpreting remainders in real-world division problems (TEKS 4.4H)",
      "Adding and subtracting fractions with like denominators",
      "Finding perimeter and area of rectangles using standard formulas",
      "Solving multi-step addition, subtraction, and multiplication word problems with strip diagrams"
    ],
    sampleQuestion: {
      question: "A baker needs 3 cups of flour for each loaf of bread. He has 50 cups of flour. How many full loaves can he bake, and how much flour is left over?",
      options: ["16 loaves, 2 cups left", "17 loaves, 1 cup left", "15 loaves, 5 cups left", "16 loaves, 1 cup left"],
      correctIndex: 0,
      explanation: "50 ÷ 3 = 16 with a remainder of 2. The baker can bake 16 full loaves and will have 2 cups left."
    },
    weeklySchedule: "Mondays & Wednesdays • 5:30 PM – 6:30 PM CST"
  },
  5: {
    grade: "Grade 5",
    badge: "Pre-Algebra Readiness",
    ageRange: "Ages 10–11",
    heroDesc: "Fractions with unlike denominators, decimal multiplication and division, volume, and coordinate graphing.",
    rsAggarwalUnits: [
      { title: "Fractions with Unlike Denominators", desc: "Finding the least common multiple, improper fractions, and fraction division." },
      { title: "Decimal Operations", desc: "Multiplying and dividing decimals, rounding, and decimal place values." },
      { title: "Volume of Prisms", desc: "Cubic units, rectangular prisms, and composite 3D figures." },
      { title: "Order of Operations & Expressions", desc: "PEMDAS rules, evaluating expressions with parentheses and brackets." },
      { title: "The Coordinate Plane", desc: "Plotting (x, y) coordinates in Quadrant I and graphing linear input-output tables." }
    ],
    staarFocus: [
      "Multiplying and dividing whole numbers and fractions (TEKS 5.3I, 5.3L)",
      "Evaluating numerical expressions following standard order of operations",
      "Solving volume problems using V = l × w × h and V = B × h",
      "Reading scatterplots and frequency tables"
    ],
    sampleQuestion: {
      question: "Evaluate the expression: 4 × (18 - 6) ÷ 3 + 2²",
      options: ["20", "18", "24", "16"],
      correctIndex: 0,
      explanation: "Parentheses: 18 - 6 = 12. Exponent: 2² = 4. Multiply & divide left to right: 4 × 12 = 48; 48 ÷ 3 = 16. Add: 16 + 4 = 20."
    },
    weeklySchedule: "Tuesdays & Thursdays • 6:30 PM – 7:30 PM CST"
  },
  6: {
    grade: "Grade 6",
    badge: "Ratios & Integers",
    ageRange: "Ages 11–12",
    heroDesc: "Middle school fundamentals: ratios, unit rates, negative numbers, one-step equations, and data distributions.",
    rsAggarwalUnits: [
      { title: "Ratios, Rates & Proportions", desc: "Unit rates, ratio tables, scale factors, and price comparisons." },
      { title: "Integers & Rational Numbers", desc: "Negative numbers, absolute value, and all four quadrants of the coordinate plane." },
      { title: "One-Step Equations & Inequalities", desc: "Using inverse operations to isolate variables; graphing inequalities on number lines." },
      { title: "Percents & Practical Applications", desc: "Finding percentages, discounts, tax, and percent increase/decrease." },
      { title: "Area & Surface Area", desc: "Parallelograms, triangles, trapezoids, and nets of 3D prisms and pyramids." }
    ],
    staarFocus: [
      "Solving proportional relationships and unit rates (TEKS 6.4B, 6.5A)",
      "Solving 1-step equations with integers and positive fractions/decimals",
      "Analyzing data using mean, median, IQR, and box plots",
      "Classifying rational numbers (integers, whole numbers, rational numbers)"
    ],
    sampleQuestion: {
      question: "A train travels 210 miles in 3.5 hours at a constant speed. How many miles does it travel in 5 hours?",
      options: ["300 miles", "280 miles", "320 miles", "350 miles"],
      correctIndex: 0,
      explanation: "Unit rate: 210 ÷ 3.5 = 60 miles per hour. In 5 hours: 60 × 5 = 300 miles."
    },
    weeklySchedule: "Mondays & Wednesdays • 6:30 PM – 7:30 PM CST"
  },
  7: {
    grade: "Grade 7",
    badge: "Proportional Reasoning",
    ageRange: "Ages 12–13",
    heroDesc: "Two-step linear equations, constant of proportionality, circles, and probability.",
    rsAggarwalUnits: [
      { title: "Two-Step Equations & Inequalities", desc: "Combining like terms, the distributive property, and solving multi-step equations." },
      { title: "Constant of Proportionality (y = kx)", desc: "Finding unit rates from equations, tables, graphs, and word problems." },
      { title: "Circles: Circumference & Area", desc: "Working with Pi (π), radius, diameter, and composite figures." },
      { title: "Probability Models", desc: "Theoretical vs. experimental probability, compound events, and tree diagrams." },
      { title: "Financial Literacy", desc: "Simple interest, sales tax, markups, and percent error." }
    ],
    staarFocus: [
      "Writing and solving 2-step equations and inequalities (TEKS 7.11A)",
      "Identifying constant rate of change and unit rates across tables and graphs",
      "Finding circumference and area of circles and composite shapes",
      "Calculating simple and compound interest"
    ],
    sampleQuestion: {
      question: "Solve for x: 3(x - 4) + 5 = 26",
      options: ["x = 11", "x = 9", "x = 13", "x = 7"],
      correctIndex: 0,
      explanation: "3(x - 4) + 5 = 26 → 3x - 12 + 5 = 26 → 3x - 7 = 26 → 3x = 33 → x = 11."
    },
    weeklySchedule: "Tuesdays & Thursdays • 7:30 PM – 8:30 PM CST"
  },
  8: {
    grade: "Grade 8",
    badge: "Algebra 1 Prep",
    ageRange: "Ages 13–14",
    heroDesc: "Linear equations, systems, exponents, the Pythagorean theorem, and functions.",
    rsAggarwalUnits: [
      { title: "Linear Equations & Slope (y = mx + b)", desc: "Slope, y-intercepts, rate of change, and graphing from standard form." },
      { title: "Systems of Linear Equations", desc: "Solving linear systems using substitution, elimination, and graphing." },
      { title: "Exponents, Roots & Scientific Notation", desc: "Exponent laws, square roots, cube roots, and operations with scientific notation." },
      { title: "The Pythagorean Theorem", desc: "Using a² + b² = c² to find distances on coordinate planes and in 3D problems." },
      { title: "Transformational Geometry", desc: "Translations, rotations, reflections, and dilations using coordinate rules." }
    ],
    staarFocus: [
      "Distinguishing linear proportional vs. non-proportional relationships (TEKS 8.5H, 8.4C)",
      "Applying the Pythagorean theorem to 2D and 3D problems",
      "Interpreting scatter plots and trend lines",
      "Solving linear equations with variables on both sides"
    ],
    sampleQuestion: {
      question: "A right triangle has legs of length 9 cm and 12 cm. What is the length of its hypotenuse?",
      options: ["15 cm", "14 cm", "18 cm", "21 cm"],
      correctIndex: 0,
      explanation: "Pythagorean theorem: 9² + 12² = 81 + 144 = 225. √225 = 15 cm."
    },
    weeklySchedule: "Mondays & Wednesdays • 7:30 PM – 8:30 PM CST"
  }
};
