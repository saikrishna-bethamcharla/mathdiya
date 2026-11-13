export const GRADE_CURRICULUM = {
  3: {
    grade: "Grade 3",
    badge: "Building Mathematical Intuition",
    ageRange: "Ages 8–9",
    heroDesc: "Transition from basic arithmetic to multi-step logical thinking, place value depth, and foundational geometric intuition.",
    rsAggarwalUnits: [
      { title: "Number Sense & 4-Digit Operations", desc: "Place value up to 10,000, expanded form, regrouping, and mental addition & subtraction tricks." },
      { title: "Multiplication Mastery & Arrays", desc: "Conceptual arrays, multiplication tables (1–12), skip-counting patterns, and word problems." },
      { title: "Introduction to Division & Remainders", desc: "Equal sharing models, long division foundation, and verifying quotients via multiplication." },
      { title: "Fractions as Parts of a Whole", desc: "Visual fraction bars, comparing like fractions, equivalent fractions on number lines." },
      { title: "Measurement & 2D Geometry", desc: "Perimeter exploration, customary & metric units, time intervals, and money calculations." }
    ],
    staarFocus: [
      "Mastering 1- and 2-step word problems (TEKS 3.4K, 3.5B)",
      "Interpreting dot plots, pictographs, and bar graphs with scale factors",
      "Representing fractions greater than zero and less than or equal to one",
      "Decomposing composite shapes to find perimeter without formulas"
    ],
    sampleQuestion: {
      question: "Maya has 4 bags of marbles. Each bag has 15 red marbles and 9 blue marbles. What is the total number of marbles Maya has?",
      options: ["96 marbles", "84 marbles", "60 marbles", "102 marbles"],
      correctIndex: 0,
      explanation: "Each bag has 15 + 9 = 24 marbles. Across 4 bags: 4 × 24 = (4 × 20) + (4 × 4) = 80 + 16 = 96 marbles!"
    },
    weeklySchedule: "Tuesdays & Thursdays • 5:00 PM – 6:00 PM CST (Alternative weekend slots available)"
  },
  4: {
    grade: "Grade 4",
    badge: "Mastering Multi-Step Problem Solving",
    ageRange: "Ages 9–10",
    heroDesc: "Deep dive into multi-digit multiplication, long division, decimals, mixed fractions, and angle classifications.",
    rsAggarwalUnits: [
      { title: "Multi-Digit Multiplication (up to 4×1 and 2×2)", desc: "Lattice, area model, and standard algorithm alongside estimation benchmarks." },
      { title: "Long Division with Remainders", desc: "Interpreting remainders in real-world contexts, division by 1-digit divisors." },
      { title: "Fractions & Decimal Equivalence", desc: "Adding fractions with denominators 10 & 100, converting tenths and hundredths to decimals." },
      { title: "Factors, Multiples & Prime Numbers", desc: "Sieve of Eratosthenes, factor trees, prime factorization, and divisibility rules." },
      { title: "Angles & Geometric Properties", desc: "Protractor angle measurements, adjacent angles, lines of symmetry, parallel & perpendicular lines." }
    ],
    staarFocus: [
      "Interpreting remainders in real-world division problems (TEKS 4.4H)",
      "Adding and subtracting fractions with like denominators",
      "Calculating perimeter and area of rectangles using formulas",
      "Solving multi-step addition, subtraction, multiplication problems with strip diagrams"
    ],
    sampleQuestion: {
      question: "A baker needs 3 cups of flour for each loaf of bread. He has 50 cups of flour. How many full loaves can he bake, and how much flour is left over?",
      options: ["16 loaves, 2 cups left", "17 loaves, 1 cup left", "15 loaves, 5 cups left", "16 loaves, 1 cup left"],
      correctIndex: 0,
      explanation: "50 ÷ 3 = 16 with a remainder of 2. The baker can bake 16 full loaves and will have 2 cups left over."
    },
    weeklySchedule: "Mondays & Wednesdays • 5:30 PM – 6:30 PM CST"
  },
  5: {
    grade: "Grade 5",
    badge: "The Bridge to Pre-Algebra",
    ageRange: "Ages 10–11",
    heroDesc: "Crucial transitional year: fraction arithmetic with unlike denominators, decimal multiplication & division, coordinate planes, and 3D volume.",
    rsAggarwalUnits: [
      { title: "Fraction Operations (Unlike Denominators)", desc: "LCM methods, improper fractions, cross-simplification, and fraction division reciprocals." },
      { title: "Decimals in Full Spectrum", desc: "Multiplying decimals by decimals, dividing decimals, rounding, and place value shifts." },
      { title: "Volume of Prisms & 3D Spatial Reasoning", desc: "Cubic units, composite 3D figures, packing problem investigations." },
      { title: "Algebraic Expressions & Order of Operations", desc: "PEMDAS mastery, evaluating variable expressions with brackets and parentheses." },
      { title: "The Coordinate Plane & Data Modeling", desc: "Plotting points (x, y), quadrant I graphing, identifying linear input-output patterns." }
    ],
    staarFocus: [
      "Multiplying and dividing whole numbers by fractions and fractions by fractions (TEKS 5.3I, 5.3L)",
      "Evaluating numerical expressions following PEMDAS without computational errors",
      "Solving volume equations V = l × w × h and V = B × h",
      "Interpreting scatterplots and categorical frequency tables"
    ],
    sampleQuestion: {
      question: "Evaluate the expression: 4 × (18 - 6) ÷ 3 + 2²",
      options: ["20", "18", "24", "16"],
      correctIndex: 0,
      explanation: "Step 1 (Parentheses): 18 - 6 = 12. Expression is 4 × 12 ÷ 3 + 2². Step 2 (Exponent): 2² = 4. Step 3 (Multiplication & Division L to R): 4 × 12 = 48; 48 ÷ 3 = 16. Step 4 (Addition): 16 + 4 = 20!"
    },
    weeklySchedule: "Tuesdays & Thursdays • 6:30 PM – 7:30 PM CST"
  },
  6: {
    grade: "Grade 6",
    badge: "Middle School Rigor & Ratio Power",
    ageRange: "Ages 11–12",
    heroDesc: "First middle school leap: ratios & unit rates, negative integers, algebraic equations, surface area, and statistical distributions.",
    rsAggarwalUnits: [
      { title: "Ratios, Rates & Proportional Relationships", desc: "Equivalent ratios, tape diagrams, unit price comparisons, and scale conversions." },
      { title: "Rational Numbers & The Coordinate System", desc: "Four-quadrant coordinate plane, absolute value, integers in real life (elevation, debts)." },
      { title: "One-Step Linear Equations & Inequalities", desc: "Inverse operations, isolating variables, graphing inequalities on number lines." },
      { title: "Percentages & Real-World Applications", desc: "Discounts, taxes, finding the whole given a percent, percent change intro." },
      { title: "Area of Polygons & 3D Nets", desc: "Decomposing parallelograms, trapezoids, triangles; calculating net surface area." }
    ],
    staarFocus: [
      "Representing and solving proportional relationships and unit rates (TEKS 6.4B, 6.5A)",
      "Solving 1-step equations involving integers and positive rational numbers",
      "Summarizing numerical data with mean, median, IQR, and box plots",
      "Classifying rational numbers inside Venn diagrams (Integers, Whole, Rational)"
    ],
    sampleQuestion: {
      question: "A train travels 210 miles in 3.5 hours at a constant speed. How many miles does it travel in 5 hours?",
      options: ["300 miles", "280 miles", "320 miles", "350 miles"],
      correctIndex: 0,
      explanation: "Find the unit rate: 210 ÷ 3.5 = 60 miles per hour. For 5 hours: 60 × 5 = 300 miles."
    },
    weeklySchedule: "Mondays & Wednesdays • 6:30 PM – 7:30 PM CST"
  },
  7: {
    grade: "Grade 7",
    badge: "Proportional Reasoning & Algebra Deepening",
    ageRange: "Ages 12–13",
    heroDesc: "Pre-Algebra excellence: multi-step linear equations, constant of proportionality, circles (π), probability models, and financial literacy.",
    rsAggarwalUnits: [
      { title: "Two-Step Equations & Multi-Variable Modeling", desc: "Distributive property, combining like terms, solving 2-step algebraic equations." },
      { title: "Constant of Proportionality (y = kx)", desc: "Identifying unit rate from tables, verbal scenarios, and linear graphs." },
      { title: "Circles: Circumference & Area", desc: "Understanding Pi (π) conceptually, radius vs diameter, composite circular regions." },
      { title: "Theoretical & Experimental Probability", desc: "Compound events, tree diagrams, simulation models, and predictive likelihood." },
      { title: "Personal Financial Literacy", desc: "Simple and compound interest, sales tax, commissions, markup/markdowns." }
    ],
    staarFocus: [
      "Setting up and solving 2-step equations and inequalities (TEKS 7.11A)",
      "Calculating constant rate of change and unit rates from multiple representations",
      "Finding area and circumference of circles and composite figures",
      "Calculating simple and compound interest over multi-year periods"
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
    badge: "Algebra 1 Foundation & High School Launch",
    ageRange: "Ages 13–14",
    heroDesc: "Rigorous high-school readiness: linear functions (y = mx + b), systems of equations, Pythagorean theorem, scientific notation, and bivariate data.",
    rsAggarwalUnits: [
      { title: "Linear Equations & Functions (y = mx + b)", desc: "Slope formula, y-intercepts, rate of change from graphs, tables, and standard form." },
      { title: "Systems of Linear Equations", desc: "Solving systems via substitution, elimination, and graphical intersection analysis." },
      { title: "Exponents, Radicals & Scientific Notation", desc: "Laws of exponents, square roots, cube roots, and operations with scientific notation." },
      { title: "Pythagorean Theorem & 3D Distance", desc: "Proof of a² + b² = c², coordinate plane distance formula, real-world 3D applications." },
      { title: "Transformational Geometry", desc: "Translations, rotations, reflections, dilations on coordinate grids with algebraic rules." }
    ],
    staarFocus: [
      "Distinguishing linear proportional vs non-proportional relationships (TEKS 8.5H, 8.4C)",
      "Applying the Pythagorean theorem to solve multi-step 2D and 3D distance problems",
      "Modeling bivariate data with trend lines and scatter plots",
      "Solving linear equations with variables on both sides"
    ],
    sampleQuestion: {
      question: "A right triangle has legs of length 9 cm and 12 cm. What is the length of its hypotenuse?",
      options: ["15 cm", "14 cm", "18 cm", "21 cm"],
      correctIndex: 0,
      explanation: "Using the Pythagorean theorem: a² + b² = c² → 9² + 12² = 81 + 144 = 225. √225 = 15 cm (a 3-4-5 scaled triple)."
    },
    weeklySchedule: "Mondays & Wednesdays • 7:30 PM – 8:30 PM CST"
  }
};
