import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { EducationItem } from '../types';

export interface AnimatedTextProps {
  text: string;
  skillsTitle?: string;
  skills?: string[];
  educationTitle?: string;
  education?: EducationItem[];
  className?: string;
  id?: string;
}

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.3, 1]);

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder for exact layout dimensions */}
      <span className="opacity-0 select-none">{char}</span>
      {/* Absolute positioned animated character */}
      <motion.span
        style={{ opacity }}
        className="absolute top-0 left-0 transition-opacity"
      >
        {char}
      </motion.span>
    </span>
  );
};

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  wordStartIndex: number;
  totalChars: number;
}> = ({ word, progress, wordStartIndex, totalChars }) => {
  const chars = word.split('');
  return (
    <span className="inline-block whitespace-nowrap mr-[0.25em]">
      {chars.map((char, i) => {
        const charIndex = wordStartIndex + i;
        const start = charIndex / totalChars;
        const end = Math.min(1, (charIndex + 1) / totalChars);
        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </span>
  );
};

const AnimatedPhrase: React.FC<{
  text: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalChars: number;
  className?: string;
}> = ({ text, progress, startIndex, totalChars, className = '' }) => {
  const words = text.split(' ');
  let running = startIndex;

  return (
    <span className={className}>
      {words.map((word, wIdx) => {
        const wordStart = running;
        running += word.length + 1;
        return (
          <Word
            key={wIdx}
            word={word}
            progress={progress}
            wordStartIndex={wordStart}
            totalChars={totalChars}
          />
        );
      })}
    </span>
  );
};

const AnimatedPill: React.FC<{
  skill: string;
  progress: MotionValue<number>;
  startIndex: number;
  totalChars: number;
}> = ({ skill, progress, startIndex, totalChars }) => {
  const pillStart = startIndex / totalChars;
  const pillEnd = Math.min(1, (startIndex + skill.length) / totalChars);

  const borderColor = useTransform(
    progress,
    [pillStart, pillEnd],
    ['rgba(255, 255, 255, 0.1)', 'rgba(168, 85, 247, 0.6)']
  );

  const backgroundColor = useTransform(
    progress,
    [pillStart, pillEnd],
    ['rgba(24, 24, 30, 0.45)', 'rgba(25, 25, 34, 0.95)']
  );

  return (
    <motion.span
      style={{
        borderColor,
        backgroundColor,
      }}
      className="inline-flex items-center justify-center rounded-full border px-4 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 cursor-default select-none"
    >
      {skill.split('').map((char, i) => {
        const charIndex = startIndex + i;
        const start = charIndex / totalChars;
        const end = Math.min(1, (charIndex + 1) / totalChars);
        return (
          <Character
            key={i}
            char={char}
            progress={progress}
            range={[start, end]}
          />
        );
      })}
    </motion.span>
  );
};

const AnimatedEduCard: React.FC<{
  item: EducationItem;
  progress: MotionValue<number>;
  cardStartIndex: number;
  totalChars: number;
  cardIndex: number;
}> = ({ item, progress, cardStartIndex, totalChars, cardIndex }) => {
  const degreeAndField = item.field ? `${item.degree} · ${item.field}` : item.degree;
  const meta = `${item.duration} · ${item.location}`;
  const scoreText = item.score || '';

  const totalCardChars =
    item.institution.length +
    1 +
    degreeAndField.length +
    1 +
    meta.length +
    (scoreText ? 1 + scoreText.length : 0);

  const cardStart = cardStartIndex / totalChars;
  const cardEnd = Math.min(1, (cardStartIndex + totalCardChars) / totalChars);

  // Distinct theme per card for visual hierarchy
  const isPrimaryCard = cardIndex === 0;

  const targetBorderColor = isPrimaryCard
    ? 'rgba(56, 189, 248, 0.55)' // Cyan/Sky blue accent for B.Tech
    : 'rgba(168, 85, 247, 0.55)'; // Purple/Violet accent for Diploma

  const targetBgColor = isPrimaryCard
    ? 'rgba(15, 23, 38, 0.92)' // Deep navy slate
    : 'rgba(24, 18, 38, 0.92)'; // Deep obsidian violet

  const borderColor = useTransform(
    progress,
    [cardStart, cardEnd],
    ['rgba(255, 255, 255, 0.08)', targetBorderColor]
  );

  const backgroundColor = useTransform(
    progress,
    [cardStart, cardEnd],
    ['rgba(20, 20, 26, 0.45)', targetBgColor]
  );

  const iconColor = useTransform(
    progress,
    [cardStart, cardEnd],
    [
      isPrimaryCard ? 'rgba(56, 189, 248, 0.4)' : 'rgba(168, 85, 247, 0.4)',
      isPrimaryCard ? 'rgba(56, 189, 248, 1)' : 'rgba(192, 132, 252, 1)',
    ]
  );

  // Section internal starting points
  let currentIdx = cardStartIndex;
  const instStart = currentIdx;
  currentIdx += item.institution.length + 1;

  const degStart = currentIdx;
  currentIdx += degreeAndField.length + 1;

  const metaStart = currentIdx;
  currentIdx += meta.length + 1;

  const scoreStart = currentIdx;

  return (
    <motion.div
      style={{
        borderColor,
        backgroundColor,
      }}
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 text-left backdrop-blur-md transition-all duration-300 ${
        isPrimaryCard
          ? 'hover:shadow-[0_8px_30px_rgba(56,189,248,0.2)] hover:border-sky-500/60'
          : 'hover:shadow-[0_8px_30px_rgba(168,85,247,0.2)] hover:border-purple-500/60'
      }`}
    >
      <div>
        {/* Top line: Icon + Institution + Score */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <motion.div
              style={{ color: iconColor }}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                isPrimaryCard
                  ? 'bg-sky-500/10 border-sky-500/25'
                  : 'bg-purple-500/10 border-purple-500/25'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
            </motion.div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
              <AnimatedPhrase
                text={item.institution}
                progress={progress}
                startIndex={instStart}
                totalChars={totalChars}
              />
            </h3>
          </div>

          {scoreText && (
            <div
              className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold shadow-sm ${
                isPrimaryCard
                  ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                  : 'border-teal-500/40 bg-teal-500/15 text-teal-300'
              }`}
            >
              <Award
                className={`inline h-3 w-3 mr-1 ${
                  isPrimaryCard ? 'text-emerald-400' : 'text-teal-400'
                }`}
              />
              <AnimatedPhrase
                text={scoreText}
                progress={progress}
                startIndex={scoreStart}
                totalChars={totalChars}
              />
            </div>
          )}
        </div>

        {/* Degree & Field */}
        <div
          className={`text-xs sm:text-sm font-medium pl-10.5 mb-2 ${
            isPrimaryCard ? 'text-sky-200/90' : 'text-purple-200/90'
          }`}
        >
          <AnimatedPhrase
            text={degreeAndField}
            progress={progress}
            startIndex={degStart}
            totalChars={totalChars}
          />
        </div>
      </div>

      {/* Meta: Duration & Location */}
      <div className="flex items-center gap-3 text-[11px] sm:text-xs text-neutral-400 pl-10.5 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-neutral-400" />
          <AnimatedPhrase
            text={item.duration}
            progress={progress}
            startIndex={metaStart}
            totalChars={totalChars}
          />
        </div>
        <span className="text-neutral-600">•</span>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-neutral-400" />
          <AnimatedPhrase
            text={item.location}
            progress={progress}
            startIndex={metaStart + item.duration.length + 3}
            totalChars={totalChars}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  skillsTitle = 'CORE TECHNICAL ARSENAL & CREATIVE STACK',
  skills,
  educationTitle = 'EDUCATION & ACADEMIC BACKGROUND',
  education,
  className = '',
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Significantly reduced delay: starts immediately as the section approaches viewport and completes smoothly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.98', 'end 0.45'],
  });

  // Calculate character totals
  const bioWords = text.split(' ');
  const bioCharsCount = text.length;

  const hasSkills = skills && skills.length > 0;
  const titleCharsCount = hasSkills ? skillsTitle.length : 0;
  const skillsCharsCount = hasSkills ? skills.reduce((acc, s) => acc + s.length, 0) : 0;

  const hasEducation = education && education.length > 0;
  const eduTitleCharsCount = hasEducation ? educationTitle.length : 0;

  const eduItemsCharsCount = hasEducation
    ? education.reduce((acc, item) => {
        const degreeAndField = item.field ? `${item.degree} · ${item.field}` : item.degree;
        const meta = `${item.duration} · ${item.location}`;
        const score = item.score || '';
        return (
          acc +
          item.institution.length +
          1 +
          degreeAndField.length +
          1 +
          meta.length +
          (score ? 1 + score.length : 0)
        );
      }, 0)
    : 0;

  const totalChars =
    bioCharsCount +
    titleCharsCount +
    skillsCharsCount +
    eduTitleCharsCount +
    eduItemsCharsCount;

  // Running total tracking
  let currentTotalIndex = 0;

  return (
    <div
      ref={containerRef}
      id={id}
      className={`flex flex-col items-center w-full ${className}`}
    >
      {/* 1. Bio Paragraph with Continuous Text Filling Animation */}
      <p className="leading-relaxed text-center font-medium text-[#D7E2EA] text-base sm:text-lg md:text-xl max-w-[580px]">
        {bioWords.map((word, index) => {
          const wordStartIndex = currentTotalIndex;
          currentTotalIndex += word.length + 1; // +1 for the space
          return (
            <Word
              key={index}
              word={word}
              progress={scrollYProgress}
              wordStartIndex={wordStartIndex}
              totalChars={totalChars}
            />
          );
        })}
      </p>

      {/* 2. Core Technologies Section continuing the filling animation */}
      {hasSkills && (
        <div className="mt-8 sm:mt-10 w-full flex flex-col items-center">
          {/* Header with </> emblem and animated text */}
          <div className="flex items-center gap-2 mb-5">
            <span className="text-purple-400 font-mono font-bold text-sm sm:text-base select-none">
              &lt;/&gt;
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {skillsTitle.split(' ').map((word, wIdx) => {
                const wordStartIndex = currentTotalIndex;
                currentTotalIndex += word.length + 1;
                return (
                  <Word
                    key={wIdx}
                    word={word}
                    progress={scrollYProgress}
                    wordStartIndex={wordStartIndex}
                    totalChars={totalChars}
                  />
                );
              })}
            </span>
          </div>

          {/* 3. The Core Technical Pills filling sequentially */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl">
            {skills.map((skill, sIdx) => {
              const skillStartIndex = currentTotalIndex;
              currentTotalIndex += skill.length;
              return (
                <AnimatedPill
                  key={sIdx}
                  skill={skill}
                  progress={scrollYProgress}
                  startIndex={skillStartIndex}
                  totalChars={totalChars}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Education Details Section continuing the filling animation */}
      {hasEducation && (
        <div className="mt-10 sm:mt-12 w-full flex flex-col items-center">
          {/* Education Header with Cyan Graduation Cap Emblem */}
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="h-4 w-4 text-cyan-400" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              {educationTitle.split(' ').map((word, wIdx) => {
                const wordStartIndex = currentTotalIndex;
                currentTotalIndex += word.length + 1;
                return (
                  <Word
                    key={wIdx}
                    word={word}
                    progress={scrollYProgress}
                    wordStartIndex={wordStartIndex}
                    totalChars={totalChars}
                  />
                );
              })}
            </span>
          </div>

          {/* Education Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {education.map((item, eIdx) => {
              const cardStartIndex = currentTotalIndex;
              const degreeAndField = item.field ? `${item.degree} · ${item.field}` : item.degree;
              const meta = `${item.duration} · ${item.location}`;
              const score = item.score || '';
              const cardCharCount =
                item.institution.length +
                1 +
                degreeAndField.length +
                1 +
                meta.length +
                (score ? 1 + score.length : 0);

              currentTotalIndex += cardCharCount;

              return (
                <AnimatedEduCard
                  key={eIdx}
                  item={item}
                  cardIndex={eIdx}
                  progress={scrollYProgress}
                  cardStartIndex={cardStartIndex}
                  totalChars={totalChars}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
