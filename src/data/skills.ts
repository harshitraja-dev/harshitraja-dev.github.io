const dev = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

export const skillGroups = [
  { title: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'Python', 'C++', 'SQL', 'GraphQL', 'Dart', 'Kotlin'] },
  { title: 'Backend', items: ['.NET 8/9', 'ASP.NET Core', 'Node.js', 'Express', 'FastAPI', 'REST', 'WebSockets', 'SSE', 'ZeroMQ'] },
  { title: 'Frontend', items: ['React 19', 'Angular', 'Vite', 'Tailwind CSS', 'PDF.js', 'VS Code Extensions'] },
  { title: '3D / BIM', items: ['Autodesk APS (Forge)', 'Data Exchange GraphQL', 'ACC / BIM 360', 'Three.js', 'IFC', 'web-ifc', 'LandXML'] },
  { title: 'AI / ML', items: ['LangChain', 'RAG', 'Hybrid search', 'Gemini', 'Ollama', 'Whisper', 'TTS', 'TensorFlow'] },
  { title: 'Data & DevOps', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Qdrant', 'Docker', 'GitLab CI/CD', 'Firebase'] },
  { title: 'Desktop & Mobile', items: ['WPF', 'NAudio', 'React Native', 'Flutter', 'FFmpeg'] },
];

export const logoBelt = [
  { name: 'C#', icon: dev('csharp/csharp-original.svg') },
  { name: '.NET', icon: dev('dot-net/dot-net-original.svg') },
  { name: 'TypeScript', icon: dev('typescript/typescript-original.svg') },
  { name: 'React', icon: dev('react/react-original.svg') },
  { name: 'Angular', icon: dev('angular/angular-original.svg') },
  { name: 'Node.js', icon: dev('nodejs/nodejs-original.svg') },
  { name: 'Python', icon: dev('python/python-original.svg') },
  { name: 'Three.js', icon: dev('threejs/threejs-original.svg') },
  { name: 'C++', icon: dev('cplusplus/cplusplus-original.svg') },
  { name: 'FastAPI', icon: dev('fastapi/fastapi-original.svg') },
  { name: 'PostgreSQL', icon: dev('postgresql/postgresql-original.svg') },
  { name: 'MongoDB', icon: dev('mongodb/mongodb-original.svg') },
  { name: 'Docker', icon: dev('docker/docker-original.svg') },
  { name: 'Flutter', icon: dev('flutter/flutter-original.svg') },
  { name: 'TensorFlow', icon: dev('tensorflow/tensorflow-original.svg') },
  { name: 'Git', icon: dev('git/git-original.svg') },
];
