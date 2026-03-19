import { motion } from "framer-motion";

export default function CampusMap({ data, onSelect }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">

      <h3 className="text-sm text-white mb-4">
        Campus Digital Twin
      </h3>

      <svg viewBox="0 0 400 300" className="w-full h-[300px]">

        {data.map((block: any, i: number) => {

          // simple positioning
          const x = 50 + i * 80;
          const y = 100;

          let color = "#34d399";

          if (block.energy > 1300) color = "#ef4444";
          else if (block.energy > 900) color = "#f59e0b";

          return (
            <motion.g
              key={block.block}
              whileHover={{ scale: 1.1 }}
              onClick={() => onSelect(block)}
              className="cursor-pointer"
            >
              <rect
                x={x}
                y={y}
                width="60"
                height="40"
                rx="6"
                fill={color}
                opacity={0.8}
              />

              <text
                x={x + 30}
                y={y + 25}
                textAnchor="middle"
                fontSize="10"
                fill="black"
              >
                {block.block}
              </text>
            </motion.g>
          );
        })}
      </svg>

    </div>
  );
}