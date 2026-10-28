import React from 'react';

/** Quiet architecture frames the interactive promenade; no baked-in UI. */
export function CampaignCity({ scene = 0, paused = false, courseId = 'course_grade3' }: { scene?: number; paused?: boolean; courseId?: string }) {
  return <div className="campaign-city campaign-city--painted" data-course-city={courseId} data-palette={scene%4} data-paused={paused} aria-hidden="true">
    <img src={`/art/neo-academy/city-${/^course_grade[3-8]$/.test(courseId)?courseId.replace('course_',''):'grade3'}-v5.webp`} alt="" decoding="async" draggable={false}/>
    <div className="campaign-city__light"/>
  </div>;
}
