import { ProjectPoint } from './ProjectPoint';

const projects = [
  {
    position: [1, 0.5, 0] as [number, number, number],
    label: 'E-Commerce Platform',
    color: '#ef4444',
    description: 'Built a scalable marketplace using Next.js and GraphQL',
    tech: 'Next.js, GraphQL, PostgreSQL',
    year: '2023'
  },
  {
    position: [0, 1, 0] as [number, number, number],
    label: 'AI Analytics Dashboard',
    color: '#22c55e',
    description: 'Real-time data visualization platform with ML integration',
    tech: 'React, Python, TensorFlow',
    year: '2022'
  },
  {
    position: [-1, 0, 0.5] as [number, number, number],
    label: 'Mobile Payment App',
    color: '#3b82f6',
    description: 'Secure payment processing system with blockchain integration',
    tech: 'React Native, Solidity, Node.js',
    year: '2021'
  },
  {
    position: [0, -1, 0] as [number, number, number],
    label: 'Cloud Infrastructure',
    color: '#f59e0b',
    description: 'Designed and implemented microservices architecture',
    tech: 'Kubernetes, AWS, Docker',
    year: '2020'
  },
];

export const Points = () => {
  return (
    <>
      {projects.map((project, index) => (
        <ProjectPoint key={index} {...project} />
      ))}
    </>
  );
};