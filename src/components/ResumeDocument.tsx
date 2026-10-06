import React from 'react';

export const ResumeDocument: React.FC = () => {
  return (
    <div
      className="w-full bg-white text-black shadow-2xl rounded-sm p-6 sm:p-10 md:p-12 overflow-x-auto select-text text-left"
      style={{
        maxWidth: '820px',
        minHeight: '1130px',
        fontFamily: 'Calibri, "Segoe UI", Arial, Helvetica, sans-serif',
        color: '#000000',
        lineHeight: 1.25,
      }}
      id="resume-pdf-document"
    >
      {/* HEADER */}
      <div className="mb-2">
        <h1
          className="text-2xl sm:text-[28px] font-bold tracking-tight mb-2"
          style={{ color: '#1a56db' }}
        >
          Batchu Girish Kumar
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[13px]">
          <div>
            <span className="font-semibold text-black">LinkedIn: </span>
            <a
              href="https://www.linkedin.com/in/girishkumar0"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: '#1a56db' }}
            >
              https://www.linkedin.com/in/girishkumar0
            </a>
          </div>
          <div className="sm:text-right">
            <span className="font-semibold text-black">Email: </span>
            <a
              href="mailto:girishsunnykumar006@gmail.com"
              className="underline hover:opacity-80"
              style={{ color: '#1a56db' }}
            >
              girishsunnykumar006@gmail.com
            </a>
          </div>
          <div>
            <span className="font-semibold text-black">GitHub: </span>
            <a
              href="https://github.com/Girishkumar0315"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: '#1a56db' }}
            >
              https://github.com/Girishkumar0315
            </a>
          </div>
          <div className="sm:text-right">
            <span className="font-semibold text-black">Mobile: </span>
            <span>+918247470315</span>
          </div>
        </div>
      </div>

      {/* SECTION: SKILLS */}
      <div className="mt-3.5 mb-2.5">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1 text-black">
          SKILLS
        </h2>
        <div className="text-[12px] leading-relaxed flex flex-col gap-0.5">
          <p>
            <strong className="text-black font-semibold">Languages:</strong> C, C++, Python, Java
          </p>
          <p>
            <strong className="text-black font-semibold">Web Technologies:</strong> HTML, CSS
          </p>
          <p>
            <strong className="text-black font-semibold">Frameworks/Libraries:</strong> Pandas, NumPy, Matplotlib, Seaborn ,Scikit-learn, DSA
          </p>
          <p>
            <strong className="text-black font-semibold">Tools/DataBases:</strong> MongoDB, MS SQL Server, MS Excel, MS Power BI, Tableau
          </p>
          <p>
            <strong className="text-black font-semibold">Soft Skills:</strong> Problem-Solving, Team Player, Adaptability, Communication Skills
          </p>
        </div>
      </div>

      {/* SECTION: PROJECTS */}
      <div className="mt-3.5 mb-2.5">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1.5 text-black">
          PROJECTS
        </h2>

        {/* Project 1 */}
        <div className="mb-2.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[12px]">
            <div>
              <span className="font-semibold text-black">Environmental Pollution Dashboard-India</span>{' '}
              <span className="font-normal text-black">| Power BI, DAX, MS Excel | </span>
              <a
                href="https://github.com/Girishkumar0315/Environmental-Pollution-Dashboard-India.git"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                href="https://app.powerbi.com/groups/me/reports/2005a8fb-8115-40cb-8bde-9d896fb24816/57afe543d098a8c9e6b0?experience=power-bi"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                Live
              </a>
            </div>
            <span className="text-[11.5px] font-normal text-black whitespace-nowrap">
              Jan&apos;26-Jun&apos; 26
            </span>
          </div>
          <ul className="list-disc ml-5 mt-0.5 text-[11.5px] leading-relaxed text-black flex flex-col gap-0.5">
            <li>
              Built an interactive <strong>Power BI dashboard</strong> to analyze environmental pollution across Indian states and districts, uncovering regional patterns, pollutant concentrations, and high-risk areas.
            </li>
            <li>
              Cleaned, prepared datasets using <strong>MS Excel</strong>, developed <strong>DAX measures and data models</strong>, and created interactive KPI cards, heatmaps, severity charts, trend analysis, and dynamic filters by using <strong>Power BI</strong>.
            </li>
            <li>
              Identified high-pollution regions and dominant pollutants, analyzed severity and time-based trends, and converted complex environmental data into actionable <strong>data-driven insights</strong>.
            </li>
          </ul>
        </div>

        {/* Project 2 */}
        <div className="mb-2.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[12px]">
            <div>
              <span className="font-semibold text-black">Commodity Price Prediction</span>{' '}
              <span className="font-normal text-black">| Python, HTML, CSS, JavaScript | </span>
              <a
                href="https://github.com/Girishkumar0315/Commodity-Price-Prediction.git"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                href="https://commodityml.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                Live
              </a>
            </div>
            <span className="text-[11.5px] font-normal text-black whitespace-nowrap">
              Jan&apos;26-Jun&apos; 26
            </span>
          </div>
          <ul className="list-disc ml-5 mt-0.5 text-[11.5px] leading-relaxed text-black flex flex-col gap-0.5">
            <li>
              Preprocessed Commodity datasets using <strong>scikit-learn</strong>, resolving 100% of missing values and normalizing features, which optimized model performance by 40% and reduced prediction error by 35%.
            </li>
            <li>
              Leveraged ML for accurate recommendations based on Training Models such as <strong>Gradient Boosting,Random Forest,Linear Regression</strong> and achieved an <strong>91% accuracy rate</strong>.
            </li>
            <li>
              Created and deployed a web- based application using CSS and integrated HTML,For Prediction Model Python Libraries ensuring an intuitive and visually appealing interface, resulting in a user satisfaction score of 93.
            </li>
          </ul>
        </div>

        {/* Project 3 */}
        <div className="mb-2.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[12px]">
            <div>
              <span className="font-semibold" style={{ color: '#1a56db' }}>TradZen</span>{' '}
              <span className="font-normal text-black">| Next.js, CSS, React, TypeScript, Binance, Groq API | </span>
              <a
                href="https://github.com/saxdy7/TradeZen.git"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                href="https://tradezen-beryl.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                Live
              </a>
            </div>
            <span className="text-[11.5px] font-normal text-black whitespace-nowrap">
              Jan&apos;26-May&apos;26
            </span>
          </div>
          <ul className="list-disc ml-5 mt-0.5 text-[11.5px] leading-relaxed text-black flex flex-col gap-0.5">
            <li>
              Engineered <strong>TradeZen</strong>, a unified crypto trading platform integrating real-time market tracking, AI-powered mentoring,AI bot suggestions, portfolio management, and smart price alerts to simplify and organize trading decisions.
            </li>
            <li>
              Built responsive interfaces using <strong>Next.js, React, TypeScript, and Tailwind CSS</strong>; integrated Supabase for authentication and data storage, Groq/Llama for AI mentor and bot experiences, and Binance for real-time market data and technical analysis.
            </li>
            <li>
              Delivered an interactive platform featuring live AI guidance, market insights, portfolio tracking, and automated price alerts, enabling faster and more informed crypto trading decisions.
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION: TRAINING */}
      <div className="mt-3.5 mb-2.5">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1.5 text-black">
          TRAINING
        </h2>
        <div className="mb-1.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[12px]">
            <div className="font-semibold text-black">
              <span>Centre for Professional Enhancement (Lovely Professional University)</span>{' '}
              <a
                href="https://github.com/Girishkumar0315/DSA-Learning-Game.git"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80 font-normal"
                style={{ color: '#1a56db' }}
              >
                GitHub
              </a>{' '}
              |{' '}
              <a
                href="https://dsa-legends.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80 font-normal"
                style={{ color: '#1a56db' }}
              >
                Live
              </a>
            </div>
            <span className="text-[11.5px] font-normal text-black whitespace-nowrap">
              Jun&apos;26-Jul&apos; 26
            </span>
          </div>
          <div className="text-[11.5px] font-semibold text-black mt-0.5">
            Data Structures,Algorithms and problem solving MasterClass
          </div>
          <ul className="list-disc ml-5 mt-0.5 text-[11.5px] leading-relaxed text-black flex flex-col gap-0.5">
            <li>
              Strengthened understanding of <strong>Data Structures, Algorithms, and Problem-Solving techniques</strong>, focusing on efficient approaches to solving computational and programming challenges.
            </li>
            <li>
              Designed and built an interactive DSA Learning Game to make concepts such as arrays, linked lists, stacks, queues, trees, graphs, sorting, and searching easier to understand through interactive learning activities.
            </li>
            <li>
              Enhanced algorithmic thinking and problem solving skills while creating an engaging learning platform that helps user understand and practice DSA Concepts interactively.
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION: CERTIFICATES */}
      <div className="mt-3.5 mb-2.5">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1 text-black">
          CERTIFICATES
        </h2>
        <div className="text-[12px] leading-relaxed flex flex-col gap-0.5">
          <div className="flex justify-between items-baseline">
            <span>
              DataBase Management System |{' '}
              <a
                href="https://drive.google.com/file/d/1XiOKk0tqUn9BiLSsWKZd9ROpuLBkI1SZ/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                Certificate
              </a>
            </span>
            <span className="text-[11.5px] font-normal text-black">Jul&apos; 26</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span>
              Python Programming | NareshIT(Hyderabad){' '}
              <a
                href="https://drive.google.com/file/d/1KeyI_LIztPGaURvU3iLxowgPg8xhgDAK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
                style={{ color: '#1a56db' }}
              >
                Certificate
              </a>
            </span>
            <span className="text-[11.5px] font-normal text-black">Mar&apos;25</span>
          </div>
        </div>
      </div>

      {/* SECTION: ACHIEVEMENTS */}
      <div className="mt-3.5 mb-2.5">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1 text-black">
          ACHIEVEMENTS
        </h2>
        <div className="text-[12px] flex justify-between items-baseline">
          <span>
            Hack-Adhyaay National Hackathon Finalists |{' '}
            <a
              href="/HACK-ADHYAAY-Certificate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
              style={{ color: '#1a56db' }}
            >
              Certificate
            </a>
          </span>
          <span className="text-[11.5px] font-normal text-black">Nov&apos;25</span>
        </div>
      </div>

      {/* SECTION: EDUCATION */}
      <div className="mt-3.5 mb-1">
        <h2 className="text-[13.5px] font-bold tracking-wider uppercase border-b border-black pb-0.5 mb-1 text-black">
          EDUCATION
        </h2>
        <div className="text-[12px] flex flex-col gap-1.5">
          <div>
            <div className="flex justify-between items-baseline font-semibold text-black">
              <span>Lovely Professional University</span>
              <span className="font-normal text-[11.5px]">Phagwara, Punjab</span>
            </div>
            <div className="flex justify-between items-baseline text-[11.5px]">
              <span>Bachelor of Technology</span>
              <span>Aug&apos; 25 – Present</span>
            </div>
            <div className="text-[11.5px] text-black">
              Computer Science and Engineering; CGPA: 7.77
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline font-semibold text-black">
              <span>Diploma</span>
              <span className="font-normal text-[11.5px]">Gudivada,AP</span>
            </div>
            <div className="flex justify-between items-baseline text-[11.5px]">
              <span>DCME:Percentage:94.4%</span>
              <span>Aug&apos; 22-Jun&apos; 25</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
