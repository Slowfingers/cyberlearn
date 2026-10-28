import { cityRoadBetween } from '../utils/campaignGeometry';
import React, { useEffect, useRef, useState } from 'react';
import type { User } from '../types';
import { PlayerAvatar } from './PlayerAvatar';
import { getPlayerCharacter } from '../utils/playerCharacter';

export interface CampaignStop { id: string; x: number; y: number; locked: boolean }
interface Point { x: number; y: number }

/** Follow the mission road in either direction; locked selections only open their brief. */
export function CampaignTraveler({ user, stops, selectedId, road }: { user: Pick<User, 'equipped'>; stops: CampaignStop[]; selectedId?: string; road?: Point[] }) {
  const first = Math.max(0, stops.findIndex(stop => stop.id === selectedId && !stop.locked));
  const initial = stops[first]?.locked ? stops.findIndex(stop => !stop.locked) : first;
  const [destinationId, setDestinationId] = useState(stops[initial]?.id ?? '');
  const directionRef = useRef(1);
  const host=useRef<HTMLDivElement>(null);
  const [point, setPoint] = useState<Point>(stops[initial] ?? { x: 50, y: 50 });
  const [moving, setMoving] = useState(false);
  const [facing, setFacing] = useState('right');
  const [atId, setAtId] = useState(stops[initial]?.id ?? '');
  const position = useRef(point);
  const reached = useRef(stops[initial]?.id ?? '');
  const geometry = useRef(stops);
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const requested = stops.find(stop => stop.id === selectedId && !stop.locked);
    if (requested) setDestinationId(requested.id);
  }, [selectedId, stops]);

  useEffect(() => {
    const changedGeometry = geometry.current.length !== stops.length || stops.some((stop, i) => stop.x !== geometry.current[i]?.x || stop.y !== geometry.current[i]?.y);
    geometry.current = stops;
    let current = stops.findIndex(stop => stop.id === reached.current && !stop.locked);
    const requested = stops.findIndex(stop => stop.id === destinationId && !stop.locked);
    if (current < 0) {
      current = requested >= 0 ? requested : stops.findIndex(stop => !stop.locked);
      if (current >= 0) { reached.current = stops[current].id; position.current = stops[current]; setPoint(stops[current]); setAtId(stops[current].id); }
    }
    if (current < 0) { setMoving(false); setAtId(''); return; }
    const target = requested >= 0 ? requested : current;
    if (changedGeometry || reduced) {
      position.current = stops[target]; reached.current = stops[target].id;
      setPoint(stops[target]); setAtId(stops[target].id); setMoving(false);
      return;
    }
    if (requested < 0) {
      position.current = stops[current]; setPoint(stops[current]); setMoving(false);
      return;
    }
    const direction = target >= current ? 1 : -1;
    const path = [position.current];
    const ids = [stops[current].id];
    if (direction !== directionRef.current && (position.current.x !== stops[current].x || position.current.y !== stops[current].y)) { path.push(stops[current]); ids.push(stops[current].id); }
    directionRef.current = direction;
    for (let i = current + direction; direction > 0 ? i <= target : i >= target; i += direction) { path.push(stops[i]); ids.push(stops[i].id); }
    if (road?.length) {
      const alongRoad=cityRoadBetween(position.current,stops[target],road);
      path.splice(0,path.length,...alongRoad);
      ids.splice(0,ids.length,...alongRoad.map(()=>stops[current].id));
    }
    if (path.length === 1 && (position.current.x !== stops[target].x || position.current.y !== stops[target].y)) { path.push(stops[target]); ids.push(stops[target].id); }
    if (path.length === 1) { setMoving(false); return; }
    const rect=host.current?.parentElement?.getBoundingClientRect();
    const lengths=path.slice(1).map((p,i)=>Math.hypot((p.x-path[i].x)*(rect?.width??1000)/100,(p.y-path[i].y)*(rect?.height??650)/100));
    const distance = lengths.reduce((sum, length) => sum + length, 0);
    if (distance < .001) { setMoving(false); return; }
    const duration=Math.max(400,distance/((host.current?.offsetHeight??106)*.5)*1000);
    let frame = 0, started: number | undefined;
    setMoving(true);
    const tick = (time: number) => {
      started ??= time;
      const progress = Math.min(1, (time - started) / duration);
      let remaining = distance * progress;
      let segment = 0;
      while (segment < lengths.length - 1 && remaining > lengths[segment]) { remaining -= lengths[segment]; segment++; }
      const t = lengths[segment] ? Math.min(1, remaining / lengths[segment]) : 1;
      const a = path[segment], b = path[segment + 1];
      const next = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
      position.current = next; setPoint(next); setFacing(b.x < a.x ? 'left' : 'right');
      reached.current = ids[segment];
      if (progress < 1) frame = requestAnimationFrame(tick);
      else { reached.current = stops[target].id; setAtId(stops[target].id); setMoving(false); }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stops, destinationId, reduced, road]);

  if (!stops.some(stop => !stop.locked)) return null;
  return <div ref={host} className="campaign-traveler" style={{ left: `${point.x}%`, top: `${point.y}%` }} data-moving={moving} data-at-mission={atId} data-x={point.x.toFixed(3)} data-y={point.y.toFixed(3)} data-facing={facing} aria-hidden="true">
    <span className="campaign-traveler__shadow"/>
    <PlayerAvatar user={user} motion={moving ? 'walk' : 'idle'} stage fullBody className="campaign-traveler__art"/>
    <span className="campaign-traveler__name">{getPlayerCharacter(user).name}</span>
  </div>;
}
