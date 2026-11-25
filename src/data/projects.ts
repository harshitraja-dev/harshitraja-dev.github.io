export type Category = 'bim' | 'ai' | 'dotnet' | 'web' | 'mobile';

export const categories: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'bim', label: '3D & BIM' },
  { id: 'ai', label: 'AI' },
  { id: 'dotnet', label: '.NET & Desktop' },
  { id: 'web', label: 'Web & Systems' },
  { id: 'mobile', label: 'Mobile' },
];

export interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  categories: Category[];
  featured?: boolean;
  highlights?: string[];
  link?: string;
  work?: boolean;
}

export const projects: Project[] = [
  // ---------- Featured ----------
  {
    title: 'LandPack 3D Format',
    tagline: 'Custom binary format for large 3D models',
    description:
      'Designed a binary 3D model format with a JSON manifest for Three.js. It stores geometry and BIM metadata (categories, levels, properties) so huge models parse faster and can be queried.',
    tech: ['C#', 'Node.js', 'Three.js', 'Autodesk APS'],
    categories: ['bim'],
    featured: true,
    work: true,
    highlights: ['40% faster load vs GLB', 'Queryable metadata'],
  },
  {
    title: 'AI-DOCS',
    tagline: 'Document intelligence & RAG platform',
    description:
      'Ask questions across PDF, Word, Excel and CSV files and get streamed answers with clickable citations that jump to the highlighted source page. Hybrid vector + keyword retrieval, OCR fallback for scanned PDFs and a semantic cache.',
    tech: ['.NET 9', 'ASP.NET Core', 'React 19', 'Gemini', 'Qdrant', 'PDF.js', 'SSE'],
    categories: ['ai', 'dotnet'],
    featured: true,
    highlights: ['<50 ms cached answers', '8 file formats', 'Hybrid search'],
  },
  {
    title: 'Floor Plan → 3D IFC',
    tagline: 'Company hackathon project',
    description:
      'Converts 2D building plans into 3D IFC (BIM) models. The user chooses the output IFC schema version at export.',
    tech: ['Python', 'C#', '.NET', 'IFC'],
    categories: ['bim', 'dotnet'],
    featured: true,
    work: true,
    highlights: ['2D → 3D BIM', 'Selectable IFC schema'],
  },
  {
    title: 'OBJViewer',
    tagline: '3D & BIM viewer inside VS Code',
    description:
      'VS Code extension that opens OBJ, PLY and IFC files in an interactive 3D view, with an IFC spatial tree (Project → Site → Building → Storey), wireframe mode and multi-model scenes.',
    tech: ['TypeScript', 'Three.js', 'web-ifc', 'VS Code API'],
    categories: ['bim', 'web'],
    featured: true,
    highlights: ['OBJ · PLY · IFC', 'Spatial tree'],
  },
  {
    title: 'DubFlow',
    tagline: 'AI video dubbing',
    description:
      'Translates YouTube videos into another language with timestamp-aligned neural voice-over and dual-language subtitles, synced to the original player.',
    tech: ['Python', 'FastAPI', 'faster-whisper', 'edge-tts', 'React'],
    categories: ['ai', 'web'],
    featured: true,
    highlights: ['2.5-min video in ~16 s', 'Dual subtitles'],
  },
  {
    title: 'Captik',
    tagline: 'AI caption editor for short-form video',
    description:
      'Browser editor with AI transcription, 35+ caption style presets, word-level timing and styling, drag-to-position captions and MP4 export with live render progress over WebSockets.',
    tech: ['React', 'TypeScript', 'Socket.IO', 'Firebase Auth', 'FFmpeg'],
    categories: ['ai', 'web'],
    featured: true,
    highlights: ['35+ presets', 'Word-level styling'],
  },

  // ---------- 3D & BIM ----------
  {
    title: 'AI Assistant for Forge Viewer',
    tagline: 'Natural language → GraphQL on BIM data',
    description:
      'Chat assistant inside Autodesk Forge Viewer: "show all walls on Level 2" becomes a GraphQL query on the Data Exchange API, and the isolated elements sync to every connected user.',
    tech: ['Node.js', 'LangChain', 'Data Exchange GraphQL', 'Socket.IO'],
    categories: ['bim', 'ai'],
    work: true,
  },
  {
    title: 'Forge Viewer: Advanced BIM Interactions',
    tagline: 'Filtering, annotations and measurement',
    description:
      'Real-time model filtering, annotations, measurement tools and multi-user chat with model context, tuned for large AEC models.',
    tech: ['Autodesk APS', 'JavaScript', 'Node.js', 'Socket.IO'],
    categories: ['bim'],
    work: true,
  },
  {
    title: 'CCT: IFC Viewer & Editor',
    tagline: 'Web IFC viewing and editing',
    description: 'Automated conversion of IFC models into optimised 3D assets for fast rendering in a web IFC viewer and editor.',
    tech: ['IFC', 'JavaScript', 'Python', 'C#', '.NET'],
    categories: ['bim', 'dotnet'],
    work: true,
  },
  {
    title: 'WeWork Roadmap',
    tagline: 'BIM 360 automation',
    description: 'Automation on the BIM 360 API to manage project files, members and account activity for project administrators.',
    tech: ['BIM 360 API', 'Python', 'REST APIs'],
    categories: ['bim'],
    work: true,
  },
  {
    title: 'BIM Manager',
    tagline: 'BIM 360 account administration',
    description: '.NET console tool for managing BIM 360 accounts with fast CRUD operations.',
    tech: ['C#', '.NET'],
    categories: ['bim', 'dotnet'],
    work: true,
  },

  // ---------- AI ----------
  {
    title: 'PlanetSense',
    tagline: 'Land-use classification from satellite & LiDAR',
    description:
      'GUI pipeline for land-use/land-cover classification and object extraction from raster imagery and LiDAR, with raster and vector export. Parallelised for a 35% speed-up.',
    tech: ['Python', 'TensorFlow', 'Rasterio', 'Fiona'],
    categories: ['ai'],
  },
  {
    title: 'AIClipCreator',
    tagline: 'Long video → captioned shorts',
    description: 'Turns long videos into captioned 9:16 short clips with multilingual Whisper transcription and batch trimming.',
    tech: ['Python', 'Whisper', 'FFmpeg', 'Streamlit'],
    categories: ['ai'],
  },

  // ---------- .NET & Desktop ----------
  {
    title: 'DualAudioShare',
    tagline: 'One source, two headphones',
    description: 'Windows app that mirrors audio from one playback device to another in real time using WASAPI loopback.',
    tech: ['C#', '.NET 8', 'WPF', 'NAudio'],
    categories: ['dotnet'],
    link: 'https://github.com/harshitraja-dev/DualAudioShare',
  },
  {
    title: 'EdgeLight',
    tagline: 'Your monitor as a ring light',
    description: 'Transparent overlay that adds an adjustable soft-light border around the screen for video calls.',
    tech: ['C#', '.NET 8', 'WPF'],
    categories: ['dotnet'],
    link: 'https://github.com/harshitraja-dev/EdgeLight.App',
  },
  {
    title: 'Image Analyzer',
    tagline: 'Architectural drawing diff',
    description: 'WPF tool that compares two drawings and highlights discrepancies. Cut manual review time by 50%.',
    tech: ['C#', '.NET', 'WPF'],
    categories: ['dotnet', 'bim'],
    work: true,
  },
  {
    title: 'ClipCraft',
    tagline: 'Batch video compressor',
    description: 'GUI tool for batch resizing, bitrate changes and compression, up to 60% smaller files.',
    tech: ['Python', 'FFmpeg'],
    categories: ['dotnet'],
    link: 'https://github.com/harshitraja-dev/ClipCraft',
  },
  {
    title: 'CRM & HRMS Platforms',
    tagline: 'Enterprise modules at BusinessNext',
    description: 'Sales-pipeline dashboards, lead tracking, analytics and HR modules for an enterprise CRM platform.',
    tech: ['React', 'Angular', 'C#', '.NET'],
    categories: ['dotnet', 'web'],
    work: true,
  },

  // ---------- Web & Systems ----------
  {
    title: 'Trading Engine',
    tagline: 'C++ engine with a Python brain',
    description:
      'C++ market-data and execution engine connected over ZeroMQ to a Python strategy service, with a FastAPI dashboard, all in Docker Compose.',
    tech: ['C++', 'ZeroMQ', 'Python', 'FastAPI', 'Docker'],
    categories: ['web'],
  },
  {
    title: 'LiveDocs',
    tagline: 'Live React prop editor (Vite plugin)',
    description: 'Zero-config Vite plugin: click any React component in the browser and edit its props live, from a Shadow-DOM sidebar.',
    tech: ['TypeScript', 'Vite', 'React'],
    categories: ['web'],
  },
  {
    title: 'Hexmail',
    tagline: 'Gmail inside Discord',
    description: 'Discord bot that connects to Gmail to receive, filter and send email from Discord.',
    tech: ['Node.js', 'JavaScript', 'Python'],
    categories: ['web'],
    link: 'https://github.com/harshitraja-dev/Hexmail',
  },

  // ---------- Mobile ----------
  {
    title: 'FolderScopedMusic',
    tagline: 'Privacy-first Android music player',
    description: 'Plays music only from the folders you pick (Storage Access Framework) instead of asking for full storage access. Background playback with notification controls.',
    tech: ['React Native', 'Android'],
    categories: ['mobile'],
  },
  {
    title: 'AppLock',
    tagline: 'Android app locker',
    description: 'Locks chosen apps using a background service that watches usage stats, wired to Flutter through method channels.',
    tech: ['Flutter', 'Dart', 'Kotlin', 'GetX'],
    categories: ['mobile'],
  },
  {
    title: 'Shopping App',
    tagline: 'Flutter e-commerce app',
    description: 'E-commerce app with real-time Firebase data and secure authentication.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    categories: ['mobile'],
  },
];
