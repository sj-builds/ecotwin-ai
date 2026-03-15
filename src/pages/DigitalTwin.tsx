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

        {/* Header */}

        <motion.div initial={{opacity:0}} animate={{opacity:1}}>

          <h1 className="text-2xl font-light tracking-display text-foreground">
            DIGITAL TWIN — CAMPUS MAP
          </h1>

          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">
            Interactive campus sustainability monitoring
          </p>

        </motion.div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


          {/* Map Section */}

          <motion.div
            initial={{opacity:0,y:10}}
            animate={{opacity:1,y:0}}
            className="lg:col-span-2 relative aspect-[16/10] bg-gradient-to-br from-emerald-950/20 via-black to-emerald-900/20 rounded-xl border border-border overflow-hidden shadow-lg"
          >

            {/* Grid */}

            <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-20">

              <div className="border border-border"></div>
              <div className="border border-border"></div>
              <div className="border border-border"></div>

              <div className="border border-border"></div>
              <div className="border border-border"></div>
              <div className="border border-border"></div>

            </div>


            {/* Buildings */}

            {buildings.map(b => (

              <motion.button
                key={b.id}
                whileHover={{scale:1.3}}
                whileTap={{scale:0.9}}
                onClick={()=>setSelected(b)}
                className={`group absolute w-5 h-5 rounded-full ring-2 ring-background ${statusColors[b.status]} cursor-pointer`}
                style={{
                  left:`${b.x}%`,
                  top:`${b.y}%`,
                  transform:"translate(-50%,-50%)"
                }}
              >

                {/* Pulse */}

                <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-current"></span>

                {/* Tooltip */}

                <span className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-card px-2 py-1 rounded text-[10px] font-mono border border-border shadow">

                  {b.name}

                </span>

              </motion.button>

            ))}


            {/* Connection lines */}

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">

              {buildings.slice(0,-1).map((b,i)=>{

                const next = buildings[i+1];

                return(

                  <line
                    key={b.id}
                    x1={`${b.x}%`}
                    y1={`${b.y}%`}
                    x2={`${next.x}%`}
                    y2={`${next.y}%`}
                    stroke="hsl(145,60%,50%)"
                    strokeWidth="1"
                    strokeDasharray="6 3"
                  />

                )

              })}

            </svg>


            {/* Legend */}

            <div className="absolute bottom-4 left-4 flex gap-6 bg-card/90 backdrop-blur-md rounded-lg px-4 py-2 border border-border shadow-md">

              <Legend color="bg-emerald-500" label="Optimal"/>
              <Legend color="bg-amber-500" label="Warning"/>
              <Legend color="bg-red-500" label="Critical"/>

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

                  <button
                    onClick={()=>setSelected(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={18}/>
                  </button>

                </div>


                {/* Score */}

                <div className="text-center">

                  <span className="text-4xl font-light text-primary">
                    {selected.score}
                  </span>

                  <span className="text-sm text-muted-foreground ml-1">
                    /100
                  </span>

                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">
                    Sustainability Score
                  </p>

                  <div className="mt-2 h-2 w-full bg-border rounded-full overflow-hidden">

                    <div
                      className="h-full bg-primary"
                      style={{width:`${selected.score}%`}}
                    />

                  </div>

                </div>


                {/* Metrics */}

                <div className="grid grid-cols-3 gap-3">

                  <Metric icon={Zap} value={selected.energy} label="Energy" unit="kWh"/>

                  <Metric icon={Droplets} value={selected.water} label="Water" unit="m³"/>

                  <Metric icon={Trash2} value={selected.waste} label="Waste" unit="kg"/>

                </div>


                {/* AI Insights */}

                {buildingInsights.length > 0 && (

                  <div>

                    <h3 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1">

                      <Brain size={14}/> AI Insights

                    </h3>

                    {buildingInsights.map(insight=>(
                      <div
                        key={insight.id}
                        className="border border-border bg-background/50 rounded-md p-3 mb-2 text-xs"
                      >

                        <p className="text-foreground">{insight.title}</p>

                        <p className="text-muted-foreground mt-1">
                          {insight.description}
                        </p>

                      </div>
                    ))}

                  </div>

                )}


                <button className="w-full py-2 rounded-md bg-primary text-primary-foreground text-xs font-mono uppercase tracking-widest hover:brightness-110 transition-all">

                  Deploy AI Optimization

                </button>

              </motion.div>

            ) : (

              <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                className="bg-card border border-border rounded-md p-5 flex items-center justify-center"
              >

                <div className="text-center space-y-2">

                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">

                    Select a Building

                  </p>

                  <p className="text-[11px] text-muted-foreground">

                    Click any node on the campus map to inspect sustainability metrics

                  </p>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>


        {/* Building Table */}

        <motion.div
          initial={{opacity:0,y:10}}
          animate={{opacity:1,y:0}}
          transition={{delay:0.2}}
          className="bg-card border border-border rounded-md overflow-hidden"
        >

          <div className="p-4 border-b border-border">

            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              All Buildings
            </h3>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-xs font-mono">

              <thead>

                <tr className="border-b border-border text-muted-foreground">

                  <th className="text-left p-3">Building</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-right p-3">Energy</th>
                  <th className="text-right p-3">Water</th>
                  <th className="text-right p-3">Waste</th>
                  <th className="text-right p-3">Score</th>
                  <th className="text-center p-3">Status</th>

                </tr>

              </thead>

              <tbody>

                {buildings.map(b=>(
                  <tr
                    key={b.id}
                    onClick={()=>setSelected(b)}
                    className="border-b border-border/50 hover:bg-primary/10 cursor-pointer transition-colors"
                  >

                    <td className="p-3">{b.name}</td>
                    <td className="p-3 text-muted-foreground">{b.type}</td>
                    <td className="p-3 text-right">{b.energy.toLocaleString()} kWh</td>
                    <td className="p-3 text-right">{b.water.toLocaleString()} m³</td>
                    <td className="p-3 text-right">{b.waste} kg</td>
                    <td className="p-3 text-right text-primary">{b.score}</td>

                    <td className="p-3 text-center">

                      <span className={`inline-block h-2 w-2 rounded-full ${statusColors[b.status]}`} />

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </motion.div>

      </div>

    </DashboardLayout>

  );

}


function Metric({icon:Icon,value,label,unit}:any){

  return(

    <div className="bg-background border border-border rounded-md p-3 text-center">

      <Icon size={16} className="mx-auto mb-1 text-muted-foreground"/>

      <p className="text-sm">{value.toLocaleString()}</p>

      <p className="text-[10px] text-muted-foreground">

        {label} ({unit})

      </p>

    </div>

  );

}


function Legend({color,label}:any){

  return(

    <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground">

      <span className={`h-2.5 w-2.5 rounded-full ${color}`}></span>

      {label}

    </div>

  );

}