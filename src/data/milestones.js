export const milestones = [
  {
    id: 'sketchpad',
    year: 1963,
    title: 'Sketchpad — Drawing on Screen',
    image: '/images/milestone-sketchpad.png',
    description:
      'Ivan Sutherland created the first program that let people draw directly on a computer screen with a light pen. It proved that computers could be creative tools, not just number crunchers — laying the foundation for everything we now call computer graphics.',
    tag: 'Interactive Graphics',
  },
  {
    id: 'gouraud',
    year: 1971,
    title: 'Gouraud Shading',
    image: '/images/milestone-gouraud.png',
    description:
      'Henri Gouraud invented a technique that blends colors smoothly across 3D surfaces instead of showing harsh flat patches. Suddenly, curved objects like spheres and faces looked natural and rounded — a huge leap toward believable 3D imagery.',
    tag: 'Surface Realism',
  },
  {
    id: 'phong',
    year: 1975,
    title: 'Phong Reflection Model',
    image: '/images/milestone-phong.png',
    description:
      'Bui Tuong Phong developed a simple formula for how light bounces off shiny surfaces, creating realistic highlights and soft shading. This model became the standard way to make virtual objects look like they belong in the real world.',
    tag: 'Lighting Science',
  },
  {
    id: 'raytracing',
    year: 1980,
    title: 'Ray Tracing',
    image: '/images/milestone-raytracing.png',
    description:
      'Turner Whitted showed how to trace individual rays of light through a scene to produce mirror reflections, glass refractions, and soft shadows. Ray tracing mimics how light actually travels — delivering photorealistic images that stunned the graphics world.',
    tag: 'Photorealism',
  },
  {
    id: 'renderman',
    year: 1988,
    title: "Pixar's RenderMan",
    image: '/images/milestone-renderman.png',
    description:
      'Pixar released RenderMan, professional software that turned 3D models into finished film frames with cinematic quality. It powered landmark animated movies and became the industry standard for high-end visual effects in Hollywood.',
    tag: 'Film Production',
  },
  {
    id: 'cgi-film',
    year: 1995,
    title: 'First Full CGI Feature Film',
    image: '/images/milestone-cg-animation.png',
    description:
      'Toy Story became the first entirely computer-generated feature film, proving that digital characters could carry an emotional story. It opened the door for animated blockbusters and showed audiences that pixels could feel as alive as hand-drawn art.',
    tag: 'Cultural Milestone',
  },
  {
    id: 'shaders',
    year: 2001,
    title: 'Programmable Shaders',
    image: '/images/milestone-shaders.png',
    description:
      'Graphics cards gained programmable shaders — small programs that artists could write to control exactly how surfaces look and behave. This gave creators unprecedented freedom to craft unique visual styles in real-time games and interactive experiences.',
    tag: 'GPU Revolution',
  },
  {
    id: 'rtx',
    year: 2018,
    title: 'Real-Time Ray Tracing',
    image: '/images/milestone-rtx.png',
    description:
      "NVIDIA's RTX technology brought movie-quality ray tracing into video games running at interactive speeds. For the first time, players could see accurate reflections and lighting update instantly — bridging the gap between offline film rendering and live gameplay.",
    tag: 'Next Generation',
  },
]

export const analysisContent = {
  title: 'Reflective Analysis: AI Visuals in Education',
  sections: [
    {
      heading: 'Strengths of AI-Generated Imagery',
      points: [
        'AI visuals transform abstract concepts like "light paths" or "shader programs" into concrete, eye-catching scenes that non-technical viewers can grasp at a glance.',
        'Each milestone image uses metaphor and diagram-style composition — making decades of innovation feel like a story rather than a textbook.',
        'Consistent artistic style across all eight images creates visual cohesion, helping audiences follow the chronological progression without distraction.',
        'Rapid generation allows educators to iterate on prompts until the image clearly communicates the core idea, something difficult with stock photography.',
      ],
    },
    {
      heading: 'Limitations and Considerations',
      points: [
        'AI images may include inaccurate technical details — such as mislabeled diagrams or impossible light paths — that could mislead careful observers.',
        'Generated art lacks the authenticity of historical photographs or original research figures, which some learners prefer for credibility.',
        'Accessibility varies: visually rich images help many learners but offer limited support for screen-reader users without strong alt text and captions.',
        'Over-reliance on AI aesthetics can make different technologies look visually similar, potentially blurring the distinct innovations each milestone represents.',
      ],
    },
    {
      heading: 'Overall Effectiveness',
      body: 'For this timeline project, AI-generated visuals effectively communicate the spirit and impact of each rendering breakthrough to general audiences. They excel at sparking curiosity and making complex history approachable. The best educational use pairs these imaginative images with clear written explanations — exactly as this timeline does — so viewers gain both emotional engagement and factual understanding. AI imagery works best as a storytelling companion, not a replacement for accurate technical description.',
    },
  ],
}
