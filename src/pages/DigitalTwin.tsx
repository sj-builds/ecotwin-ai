import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Droplets, Trash2, Brain } from "lucide-react";

import { DashboardLayout } from "@/components/DashboardLayout";
import { buildings, aiInsights } from "@/data/mockData";

import type { Building } from "@/data/mockData";

const statusColors = {
  optimal: "bg-emerald-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
};

export default function DigitalTwin() {

  const [selected, setSelected] = useState<Building | null>(null);

  const buildingInsights = selected
    ? aiInsights.filter(i => i.buildingId === selected.id)
    : [];

  return (

    <DashboardLayout>

      <div className="space-y-6 max-w-[1400px]">

        {/* Title */}

        <motion.div initial={{opacity:0}} animate={{opacity:1}}>

          <h1 className="text-2xl font-light tracking-display text-foreground">
            DIGITAL TWIN — CAMPUS MAP
          </h1>

          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
            Real-time campus sustainability monitoring
          </p>

        </motion.div>


        {/* Layout */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


          {/* Campus Map */}

          <motion.div
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            className="lg:col-span-2 relative aspect-[16/10] bg-gradient-to-br from-emerald-950 via-black to-emerald-900 rounded-xl border border-emerald-800 overflow-hidden shadow-xl"
          >

            {/* Grid zones */}

            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-20">

              <div className="border border-emerald-700"></div>
              <div className="border border-emerald-700"></div>
              <div className="border border-emerald-700"></div>

              <div className="border border-emerald-700"></div>
              <div className="border border-emerald-700"></div>
              <div className="border border-emerald-700"></div>

            </div>


            {/* Sensor network indicator */}

            <div className="absolute top-3 right-3 flex items-center gap-2 text-xs font-mono text-emerald-300">

              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>

              Live Sensor Network

            </div>


            {/* Buildings */}

            {buildings.map(b => (

              <motion.button
                key={b.id}
                whileHover={{scale:1.4}}
                whileTap={{scale:0.9}}
                onClick={()=>setSelected(b)}
                className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-lg ${statusColors[b.status]}`}
                style={{
                  left:`${b.x}%`,
                  top:`${b.y}%`,
                  transform:"translate(-50%,-50%)"
                }}
              >

                {/* Pulse animation */}

                <div className="absolute inset-0 rounded-full border border-current animate-ping opacity-30"></div>

                {/* Glow */}

                <div className="absolute inset-0 rounded-full blur-md opacity-40 bg-current"></div>


                {/* Tooltip */}

                <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono bg-black/80 backdrop-blur px-2 py-1 rounded border border-emerald-700 opacity-0 hover:opacity-100 transition">

                  {b.name}

                </div>

              </motion.button>

            ))}


            {/* Data flow lines */}

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">

              {buildings.slice(0,-1).map((b,i)=>{

                const next = buildings[i+1];

                return (

                  <line
                    key={b.id}
                    x1={`${b.x}%`}
                    y1={`${b.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="hsl(145,60%,50%)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />

                )

              })}

            </svg>


            {/* Campus efficiency */}

            <div className="absolute bottom-3 right-3 text-xs font-mono bg-black/70 backdrop-blur px-3 py-2 rounded border border-emerald-800">

              Campus Efficiency

              <span className="text-emerald-400 ml-2">84%</span>

            </div>


          </motion.div>


          {/* Detail Panel */}

          <AnimatePresence>

            {selected ? (

              <motion.div
                key={selected.id}
                initial={{opacity:0,x:20}}
                animate={{opacity:1,x:0}}
                exit={{opacity:0,x:20}}
                className="bg-card border border-border rounded-md p-5 space-y-5"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h2 className="text-lg font-light">
                      {selected.name}
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      {selected.type}
                    </p>

                  </div>

                  <button onClick={()=>setSelected(null)}>
                    <X size={18}/>
                  </button>

                </div>


                {/* Score */}

                <div className="text-center">

                  <span className="text-4xl font-light text-emerald-400">
                    {selected.score}
                  </span>

                  <span className="text-sm ml-1 text-muted-foreground">
                    /100
                  </span>

                  <p className="text-xs text-muted-foreground mt-1">
                    Sustainability Score
                  </p>

                </div>


                {/* Metrics */}

                <div className="space-y-3">

                  <Metric icon={Zap} label="Energy" value={selected.energy} unit="kWh"/>

                  <Metric icon={Droplets} label="Water" value={selected.water} unit="m³"/>

                  <Metric icon={Trash2} label="Waste" value={selected.waste} unit="kg"/>

                </div>


                {/* AI insights */}

                {buildingInsights.length > 0 && (

                  <div>

                    <h3 className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                      <Brain size={14}/> AI Insights
                    </h3>

                    {buildingInsights.map(insight=>(
                      <div
                        key={insight.id}
                        className="border border-border rounded p-3 mb-2 text-xs"
                      >

                        <p>{insight.title}</p>

                        <p className="text-muted-foreground mt-1">
                          {insight.description}
                        </p>

                      </div>
                    ))}

                  </div>

                )}


                <button className="w-full py-2 rounded bg-emerald-500 text-black font-semibold">

                  Deploy AI Optimization

                </button>

              </motion.div>

            ) : (

              <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                className="bg-card border border-border rounded-md flex items-center justify-center p-6"
              >

                <p className="text-xs text-muted-foreground text-center">
                  Select a building node to inspect
                </p>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </DashboardLayout>

  );

}


function Metric({icon:Icon,label,value,unit}:any){

  return(

    <div className="flex justify-between border-b border-border pb-2">

      <div className="flex items-center gap-2 text-xs text-muted-foreground">

        <Icon size={14}/>

        {label}

      </div>

      <div className="text-sm">

        {value.toLocaleString()} {unit}

      </div>

    </div>

  );

}