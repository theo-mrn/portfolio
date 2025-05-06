'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('skills');

  return (
    <section
      className="py-20 text-white backdrop-filter backdrop-blur-lg bg-black bg-opacity-40 rounded-lg"
      id="skills"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center max-w-6xl mx-auto lg:space-x-10">
        <div className="flex flex-col items-start lg:w-1/2">
          <p className="text-gray-500 uppercase tracking-widest mb-4 text-sm">
            Expertise & Capabilities
          </p>
          <h2 className="text-4xl font-bold mb-4">Technical Proficiency</h2>
          <p className="text-gray-400 mb-6">
            With extensive experience in cybersecurity and network engineering, I specialize in vulnerability assessment, 
            penetration testing, and implementing robust security solutions. My background includes working with critical 
            infrastructure protection, threat hunting, and developing secure network architectures. I combine technical 
            expertise with strategic thinking to defend against evolving cyber threats.
          </p>
          <div className="flex space-x-2">
            <button
              className={`px-8 py-3 rounded-full transition-all ${
                activeTab === 'skills' ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setActiveTab('skills')}
            >
              Skills
            </button>
            <button
              className={`px-8 py-3 rounded-full transition-all ${
                activeTab === 'tools' ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
              }`}
              onClick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>
        </div>

        <div className="mt-10 lg:mt-0 lg:w-1/2">
          {activeTab === 'skills' ? <SkillsList /> : <ToolsList />}
        </div>
      </div>
    </section>
  );
}

const SkillsList = () => (
  <ul className="grid grid-cols-4 gap-6">
    {skillsData.map(skill => (
      <li key={skill.name} className="relative group">
        <div className="w-20 h-20 bg-[#2c2c2c] rounded-[10px] flex justify-center items-center shadow-lg transition-transform transform hover:scale-105">
          <Image src={skill.image} alt={skill.name} width={50} height={50} className="rounded-[10px]" />
        </div>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md">
          {skill.name}
        </span>
      </li>
    ))}
  </ul>
);

const ToolsList = () => (
  <ul className="grid grid-cols-4 gap-6">
    {toolsData.map(tool => (
      <li key={tool.name} className="relative group">
        <div className="w-20 h-20 bg-[#2c2c2c] rounded-[10px] flex justify-center items-center shadow-lg transition-transform transform hover:scale-105">
          <Image src={tool.image} alt={tool.name} width={50} height={50} className="rounded-[10px]" />
        </div>
        <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-sm px-2 py-1 rounded-md">
          {tool.name}
        </span>
      </li>
    ))}
  </ul>
);

const skillsData = [
  { name: 'Bash', image: '/assets/images/bash.png' },
  { name: 'Python', image: '/assets/images/python.png' },
  { name: 'JavaScript', image: '/assets/images/javascript.png' },
  { name: 'Assembly', image: '/assets/images/asm.png' },
  { name: 'SQL', image: '/assets/images/sql.png' },
  { name: 'CMD', image: '/assets/images/command.png' },
  { name: 'Powershell', image: '/assets/images/powershell.png' },
  { name: 'Termux', image: '/assets/images/termux.png' },
  { name: 'Pi', image: '/assets/images/pi.png' },
  { name: 'Docker', image: '/assets/images/docer.png' },
  { name: 'Kali Linux', image: '/assets/images/kali.png' },
  { name: 'Arch', image: '/assets/images/arch.png' }
];

const toolsData = [
  { name: 'Nmap', image: '/assets/images/nmap.png' },
  { name: 'AirNg', image: '/assets/images/wifi.png' },
  { name: 'SETool', image: '/assets/images/set.png' },
  { name: 'Msploit', image: '/assets/images/meta.png' },
  { name: 'SQLi', image: '/assets/images/sqli.png' },
  { name: 'Fs', image: '/assets/images/joker.png' },
  { name: 'AWS', image: '/assets/images/aws.png' },
  { name: 'Arduino', image: '/assets/images/arduino.png' },
  { name: 'Webpack', image: '/assets/images/webpack.png' },
  { name: 'Firebase', image: '/assets/images/firebase.png' },
  { name: 'VS Code', image: '/assets/images/vs-code.png' },
  { name: 'Git', image: '/assets/images/git.png' }
];
