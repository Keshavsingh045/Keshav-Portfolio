import React, { useRef, useState, useEffect, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { skills, projects, experience } from '../data';
import TiltCard from './TiltCard';

export default function KnowledgeGraph() {
  const fgRef = useRef();
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [hoverNode, setHoverNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate Graph Data
    const nodes = [];
    const links = [];
    const nodeMap = new Set();

    const addNode = (id, group, val, name) => {
      if (!nodeMap.has(id)) {
        nodes.push({ id, group, val, name: name || id });
        nodeMap.add(id);
      }
    };

    // Root Node
    addNode('Keshav', 'root', 20, 'Keshav Kundan');

    // 1. Add All Skills
    const allSkills = [...skills.hard, ...skills.soft];
    allSkills.forEach(skill => {
      addNode(skill, 'skill', 5);
      links.push({ source: 'Keshav', target: skill, value: 1 });
    });

    // 2. Add Projects & Connect to Skills
    projects.forEach(proj => {
      addNode(proj.title, 'project', 12);
      links.push({ source: 'Keshav', target: proj.title, value: 2 });
      proj.tech.forEach(tech => {
        // Find best match in skills (or add if new)
        const techMatch = allSkills.find(s => s.toLowerCase() === tech.toLowerCase()) || tech;
        addNode(techMatch, 'skill', 5);
        links.push({ source: proj.title, target: techMatch, value: 3 });
      });
    });

    // 3. Add Experience & Connect to Skills
    experience.forEach(exp => {
      addNode(exp.role, 'experience', 10, exp.company);
      links.push({ source: 'Keshav', target: exp.role, value: 2 });
      exp.tech.forEach(tech => {
        const techMatch = allSkills.find(s => s.toLowerCase() === tech.toLowerCase()) || tech;
        addNode(techMatch, 'skill', 5);
        links.push({ source: exp.role, target: techMatch, value: 3 });
      });
    });

    setGraphData({ nodes, links });
  }, []);

  // Responsive Canvas Size
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 500
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Pre-process neighbor nodes for quick hover lookup
  const getNeighbors = useCallback((nodeId) => {
    if (!nodeId) return new Set();
    const neighbors = new Set();
    graphData.links.forEach(link => {
      const srcId = typeof link.source === 'object' ? link.source.id : link.source;
      const tgtId = typeof link.target === 'object' ? link.target.id : link.target;
      if (srcId === nodeId) neighbors.add(tgtId);
      if (tgtId === nodeId) neighbors.add(srcId);
    });
    return neighbors;
  }, [graphData.links]);

  const handleNodeHover = useCallback((node) => {
    setHoverNode(node || null);
  }, []);

  const hoverNeighbors = hoverNode ? getNeighbors(hoverNode.id) : new Set();

  return (
    <TiltCard className="w-full">
      <div 
        ref={containerRef} 
        className="glass-panel w-full h-[500px] rounded-2xl overflow-hidden relative border border-slate-700/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]"
      >
        <div className="absolute top-4 left-6 z-10 pointer-events-none">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            Knowledge Graph
          </h3>
          <p className="text-sm text-slate-400 font-medium">Drag, Zoom & Hover to explore the network.</p>
        </div>

        <div className="absolute top-4 right-6 z-10 pointer-events-none flex gap-4 text-xs font-bold">
          <div className="flex items-center gap-1 text-slate-300"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Skills</div>
          <div className="flex items-center gap-1 text-slate-300"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Projects</div>
          <div className="flex items-center gap-1 text-slate-300"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Experience</div>
        </div>

        {graphData.nodes.length > 0 && (
          <ForceGraph2D
            ref={fgRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            nodeLabel="name"
            nodeRelSize={6}
            nodeColor={(node) => {
              if (hoverNode) {
                if (node.id === hoverNode.id) return '#ffffff';
                if (hoverNeighbors.has(node.id)) {
                   if (node.group === 'skill') return '#60a5fa'; // blue
                   if (node.group === 'project') return '#a855f7'; // purple
                   if (node.group === 'experience') return '#eab308'; // yellow
                   return '#ffffff';
                }
                return '#1e293b'; // dimmed
              }
              if (node.group === 'root') return '#ffffff';
              if (node.group === 'project') return '#a855f7';
              if (node.group === 'experience') return '#eab308';
              return '#3b82f6'; // default skill
            }}
            linkColor={(link) => {
              const srcId = typeof link.source === 'object' ? link.source.id : link.source;
              const tgtId = typeof link.target === 'object' ? link.target.id : link.target;
              if (hoverNode) {
                if (srcId === hoverNode.id || tgtId === hoverNode.id) return 'rgba(96, 165, 250, 0.8)';
                return 'rgba(30, 41, 59, 0.2)'; // dimmed
              }
              return 'rgba(59, 130, 246, 0.2)'; // default line
            }}
            linkWidth={(link) => {
              const srcId = typeof link.source === 'object' ? link.source.id : link.source;
              const tgtId = typeof link.target === 'object' ? link.target.id : link.target;
              if (hoverNode && (srcId === hoverNode.id || tgtId === hoverNode.id)) return 2;
              return 1;
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
              // Draw node
              const label = node.name;
              const fontSize = node.val / 2;
              ctx.font = `${fontSize}px Inter, sans-serif`;
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.4);

              // Background Circle
              ctx.beginPath();
              ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI, false);
              ctx.fillStyle = node.color;
              ctx.fill();

              // Highlight outline for hover
              if (hoverNode && node.id === hoverNode.id) {
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = node.color;
              } else {
                ctx.shadowBlur = 0;
              }

              // Only show text for larger nodes or when zoomed in/hovered
              const isHovered = hoverNode && (node.id === hoverNode.id || hoverNeighbors.has(node.id));
              if (globalScale > 1.5 || node.val > 8 || isHovered) {
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = (hoverNode && !isHovered) ? '#475569' : '#e2e8f0';
                
                // Position text below bubble
                ctx.fillText(label, node.x, node.y + node.val + fontSize);
              }
            }}
            onNodeHover={handleNodeHover}
            cooldownTicks={100}
            onEngineStop={() => fgRef.current.zoomToFit(400, 50)}
          />
        )}
      </div>
    </TiltCard>
  );
}
