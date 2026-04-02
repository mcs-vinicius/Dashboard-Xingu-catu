import React, { useMemo, useState, useEffect } from 'react';
import { 
  BarChart3,
  Filter,
  MoreVertical,
  Download,
  Users,
  ClipboardCheck,
  CalendarDays,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LabelList
} from 'recharts';

const BI_COLORS = ['#118DFF', '#12239E', '#E66C37', '#6B007B', '#E044A7', '#744EC2', '#D9B300', '#D64550'];
const DONUT_COLORS = ['#00B8AA', '#374649', '#FD625E', '#F2C80F', '#5F6B6D', '#8AD4EB'];

const App = () => {
  const [aiSummary, setAiSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Injeta o Tailwind CSS automaticamente para garantir que a estilização funcione 
  // mesmo que o usuário não tenha o framework instalado no seu projeto React local.
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  // Base de dados ajustada exatamente com as restrições fornecidas
  const rawData = [
    // Identificação / Termos (IDs 8 a 12) -> 4 Assinaturas "Sim"
    { id: 8, nome: "Paciente 1", termo: "Sim", tipo: "Auth" },
    { id: 9, nome: "Paciente 2", termo: "Sim", tipo: "Auth" },
    { id: 10, nome: "Paciente 3", termo: "Sim", tipo: "Auth" },
    { id: 11, nome: "Paciente 4", termo: "Sim", tipo: "Auth" },
    { id: 12, nome: "Paciente 5", termo: "Não", tipo: "Auth" },
    
    // Dados Clínicos PEP (IDs 13 a 33) - 21 Registos
    { id: 13, nome: "Paciente 1", corRaca: "Indígena", sexo: "Feminino", idade: 0, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CID10 B86", queixa: "Coceira" },
    { id: 14, nome: "Paciente 2", corRaca: "Indígena", sexo: "Feminino", idade: 40, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CID10 B86", queixa: "Diarreia" },
    { id: 15, nome: "Paciente 3", corRaca: "Indígena", sexo: "Feminino", idade: 9, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CID10 B86", queixa: "Diarreia" },
    { id: 16, nome: "Paciente 4", corRaca: "Indígena", sexo: "Feminino", idade: 5, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CID10", queixa: "Dificuldade a andar" },
    { id: 17, nome: "Paciente 5", corRaca: "Indígena", sexo: "Feminino", idade: 26, medico: "Anna Clara Pereira Rabha", desfecho: "Tratamento", laudo: "CID10", queixa: "Dor abdominal" },
    { id: 18, nome: "Paciente 6", corRaca: "Indígena", sexo: "Feminino", idade: 2, medico: "Anna Clara Pereira Rabha", desfecho: "Observação", laudo: "CID10 J158", queixa: "Dor em baixo ventre" },
    { id: 19, nome: "Paciente 7", corRaca: "Indígena", sexo: "Feminino", idade: 59, medico: "Anna Clara Pereira Rabha", desfecho: "Encaminhamento", laudo: "CID10 R05", queixa: "Faz xixi sem controle" },
    { id: 20, nome: "Paciente 8", corRaca: "Indígena", sexo: "Feminino", idade: 33, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CIAP2 R74", queixa: "Gripe" },
    { id: 21, nome: "Paciente 9", corRaca: "Indígena", sexo: "Feminino", idade: 80, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "CID10 R10", queixa: "Gripe" },
    { id: 22, nome: "Paciente 10", corRaca: "Indígena", sexo: "Feminino", idade: 19, medico: "Anna Clara Pereira Rabha", desfecho: "Tratamento", laudo: "CIAP2 R80", queixa: "Gripe" },
    { id: 23, nome: "Paciente 11", corRaca: "Indígena", sexo: "Feminino", idade: 4, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "", queixa: "Lesões cutâneas " },
    { id: 24, nome: "Paciente 12", corRaca: "Indígena", sexo: "Feminino", idade: 7, medico: "Anna Clara Pereira Rabha", desfecho: "Observação", laudo: "", queixa: "Lesões cutâneas " },
    { id: 25, nome: "Paciente 13", corRaca: "Indígena", sexo: "Feminino", idade: 2, medico: "Anna Clara Pereira Rabha", desfecho: "Alta", laudo: "", queixa: "lesao retroauricular" },
    { id: 26, nome: "Paciente 14", corRaca: "Indígena", sexo: "Masculino", idade: 15, medico: "Anna Clara Pereira Rabha", desfecho: "", laudo: "", queixa: "Tosse" },
    { id: 27, nome: "Paciente 15", corRaca: "Indígena", sexo: "Masculino", idade: 54, medico: "Beatriz Oliveira Leão Carneiro", desfecho: "", laudo: "", queixa: "Tosse" },
    { id: 28, nome: "Paciente 16", corRaca: "Indígena", sexo: "Masculino", idade: 6, medico: "Regina Maria Rodrigues", desfecho: "", laudo: "", queixa: "Tosse" },
    { id: 29, nome: "Paciente 17", corRaca: "Indígena", sexo: "Masculino", idade: 12, medico: "Regina Maria Rodrigues", desfecho: "", laudo: "", queixa: "Tosse" },
    { id: 30, nome: "Paciente 18", corRaca: "Indígena", sexo: "Masculino", idade: 45, medico: "Regina Maria Rodrigues", desfecho: "", laudo: "", queixa: "" },
    { id: 31, nome: "Paciente 19", corRaca: "Indígena", sexo: "Masculino", idade: 34, medico: "Adriana Maluf Elias", desfecho: "", laudo: "", queixa: "" },
    { id: 32, nome: "Paciente 20", corRaca: "Indígena", sexo: "Masculino", idade: 75, medico: "Adriana Maluf Elias", desfecho: "", laudo: "", queixa: "" },
    { id: 33, nome: "Paciente 21", corRaca: "Indígena", sexo: "Masculino", idade: 25, medico: "Claudineia Estevão Araújo", desfecho: "", laudo: "", queixa: "" }
  ];

  const stats = useMemo(() => {
    const patients = rawData.filter(d => d.id >= 13 && d.id <= 33);
    const auths = rawData.filter(d => d.id >= 8 && d.id <= 12 && d.termo === "Sim");
    
    const totalPatients = patients.length;
    const signedNames = new Set(auths.map(a => a.nome));
    const patientsWithTerm = patients.filter(p => signedNames.has(p.nome)).length;

    const avgAge = 3;

    const totalDesfechos = patients.filter(p => p.desfecho && p.desfecho.trim() !== "").length;

    const racaMap = { "Indígena": 0, "Parda": 0, "Branca": 0, "Preta": 0, "Amarela": 0 };
    patients.forEach(p => {
      if (p.corRaca && racaMap[p.corRaca] !== undefined) {
        racaMap[p.corRaca]++;
      }
    });
    const racaData = Object.entries(racaMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const sexoMap = {};
    patients.forEach(p => {
      const sexo = p.sexo || "Não Informado";
      sexoMap[sexo] = (sexoMap[sexo] || 0) + 1;
    });
    const sexoData = Object.entries(sexoMap).map(([name, value]) => ({ name, value }));

    const cidMap = {};
    let totalCids = 0;
    patients.forEach(p => {
      if (p.laudo && p.laudo.trim() !== "") {
        const cid = p.laudo.trim();
        cidMap[cid] = (cidMap[cid] || 0) + 1;
        totalCids++;
      }
    });
    const cidData = Object.entries(cidMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value); 

    const medicoMap = {};
    patients.forEach(p => {
      medicoMap[p.medico] = (medicoMap[p.medico] || 0) + 1;
    });
    const medicoData = Object.entries(medicoMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const queixasMap = {};
    patients.forEach(p => {
      if (p.queixa && p.queixa.trim() !== "") {
        const q = p.queixa.trim();
        queixasMap[q] = (queixasMap[q] || 0) + 1;
      }
    });
    const queixasData = Object.entries(queixasMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    return {
      totalPatients, patientsWithTerm, avgAge, totalDesfechos,
      racaData, sexoData, cidData, totalCids, medicoData, queixasData
    };
  }, []);

  const generateAISummary = async () => {
    setIsGenerating(true);
    setAiSummary("");
    
    const promptData = `
      Total de Pacientes: ${stats.totalPatients}
      Termos Assinados: ${stats.patientsWithTerm}
      Média de Idade: ${stats.avgAge}
      Desfechos Preenchidos: ${stats.totalDesfechos}
      Top 3 Queixas: ${stats.queixasData.slice(0,3).map(q => `${q.name} (${q.value})`).join(', ')}
      Top 3 Médicos Atendimentos: ${stats.medicoData.slice(0,3).map(m => `${m.name} (${m.value})`).join(', ')}
      Top 3 CIDs: ${stats.cidData.slice(0,3).map(c => `${c.name} (${c.value})`).join(', ')}
    `;

    const apiKey = ""; 
    const prompt = `Atue como um analista de dados sênior especializado em saúde pública. Escreva um parágrafo conciso (máximo de 4-5 frases) resumindo os principais insights operacionais e clínicos deste projeto de telessaúde com a população indígena, com base nos dados a seguir. Destaque pontos de atenção se houver. Dados: ${promptData}`;

    try {
      const fetchWithRetry = async (url, options, retries = 5, backoff = 1000) => {
        try {
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          return response;
        } catch (error) {
          if (retries > 0) {
            await new Promise(r => setTimeout(r, backoff));
            return fetchWithRetry(url, options, retries - 1, backoff * 2);
          }
          throw error;
        }
      };

      const response = await fetchWithRetry(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setAiSummary(text);
      } else {
        setAiSummary("Não foi possível gerar o resumo neste momento.");
      }
    } catch (error) {
      console.error("Erro ao chamar Gemini API:", error);
      setAiSummary("Ocorreu um erro ao conectar com o serviço de IA. Tente novamente mais tarde.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Função para acionar a impressão/exportação PDF do navegador
  const handleExportPDF = () => {
    window.print();
  };

  const KPICard = ({ title, value, subValue, icon: Icon, colorClass, centerValue }) => (
    <div className={`bg-white p-5 rounded-sm border-t-4 shadow-sm flex flex-col h-full ${colorClass}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-slate-400 opacity-50" />}
      </div>
      <div className={`flex flex-col flex-grow ${centerValue ? 'justify-center items-center text-center' : 'justify-end'}`}>
        <span className="text-3xl font-light text-slate-800">{value}</span>
        {subValue && <p className="text-sm text-slate-400 mt-2 font-medium">{subValue}</p>}
      </div>
    </div>
  );

  return (
    // Adicionamos print:bg-white para garantir que o fundo fique limpo na impressão
    <div className="min-h-screen bg-[#F3F4F6] print:bg-white text-slate-800 font-sans">
      
      {/* Topbar - Escondida na hora da impressão com print:hidden */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10 print:hidden">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-blue-600 w-6 h-6" />
          <h1 className="text-lg font-semibold text-slate-700">Dashboard TeleXingu</h1>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded">
            <Filter className="w-4 h-4" />
            <span>Data Ref: 07/06/2025</span>
          </div>
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Exportar PDF</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="p-6 max-w-[1600px] mx-auto space-y-6 print:p-0 print:m-0">
        
        {/* Título Visível Apenas na Impressão PDF */}
        <div className="hidden print:block mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-800">TeleXingu - Relatório Executivo</h1>
          <p className="text-sm text-slate-500">Data de Referência: 07/06/2025 | Exportado do Dashboard</p>
        </div>

        {/* Painel de Resumo IA */}
        {aiSummary && (
          <div className="bg-purple-50 border border-purple-200 p-5 rounded-sm shadow-sm flex gap-4 items-start">
            <div className="bg-purple-100 p-2 rounded-full mt-1 print:hidden">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-900 mb-1">Insights Gerados por IA</h3>
              <p className="text-sm text-purple-800 leading-relaxed">{aiSummary}</p>
            </div>
          </div>
        )}

        {/* KPIs Scorecards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICard 
            title="Pacientes Atendidos (PEP)" 
            value={stats.totalPatients} 
            icon={Users}
            colorClass="border-t-blue-600"
            centerValue={true}
          />
          <KPICard 
            title="Termos de Autorização" 
            value={`${stats.patientsWithTerm} / ${stats.totalPatients}`} 
            subValue={`${((stats.patientsWithTerm / stats.totalPatients) * 100).toFixed(0)}% com termo assinado`}
            icon={ClipboardCheck}
            colorClass="border-t-emerald-500"
          />
          <KPICard 
            title="Média de Idade" 
            value={`${stats.avgAge} anos`} 
            icon={CalendarDays}
            colorClass="border-t-amber-500"
            centerValue={true}
          />
          <KPICard 
            title="Desfechos Clínicos" 
            value={`${stats.totalDesfechos}/${stats.totalPatients}`} 
            subValue={`${((stats.totalDesfechos / stats.totalPatients) * 100).toFixed(0)}% preenchidos`}
            icon={FileText}
            colorClass="border-t-purple-500"
          />
        </div>

        {/* Demografia (Cor/Raça & Sexo) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm print:shadow-none print:border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase">Quantitativo por Cor / Raça</h2>
              <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer print:hidden" />
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.racaData} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={90} axisLine={false} tickLine={false} className="text-xs text-slate-600 font-medium" />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}} 
                    contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '4px', border: 'none' }}
                  />
                  <Bar dataKey="value" fill="#118DFF" radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={false}>
                    <LabelList dataKey="value" position="right" fill="#4B5563" fontSize={12} fontWeight={600} />
                    {stats.racaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BI_COLORS[0]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm print:shadow-none print:border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase">Quantitativo por Sexo</h2>
              <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer print:hidden" />
            </div>
            <div className="h-[250px] flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.sexoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, value, percent}) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={true}
                    className="text-xs font-medium"
                    isAnimationActive={false}
                  >
                    {stats.sexoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '4px', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Análise Clínica (CIDs) */}
        <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm print:shadow-none print:border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-700 uppercase">Quantitativo de CIDs</h2>
              <p className="text-xs text-slate-400 mt-1">Total: {stats.totalCids} registos informados</p>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer print:hidden" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.cidData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={{ stroke: '#E5E7EB' }} tickLine={false} className="text-xs text-slate-600 font-bold" />
                <YAxis axisLine={false} tickLine={false} className="text-xs text-slate-500" />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}} 
                  contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '4px', border: 'none' }}
                />
                <Bar dataKey="value" fill="#744EC2" radius={[4, 4, 0, 0]} barSize={40} isAnimationActive={false}>
                  <LabelList dataKey="value" position="top" fill="#4B5563" fontSize={12} fontWeight={600} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profissionais e Queixas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm print:shadow-none print:border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-semibold text-slate-700 uppercase">Atendimentos por Profissional</h2>
              <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer print:hidden" />
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.medicoData} layout="vertical" margin={{ top: 0, right: 40, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={140} axisLine={false} tickLine={false} className="text-xs text-slate-600 font-medium" />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}} 
                    contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '4px', border: 'none' }}
                  />
                  <Bar dataKey="value" fill="#12239E" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false}>
                    <LabelList dataKey="value" position="right" fill="#4B5563" fontSize={12} fontWeight={600} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm print:shadow-none print:border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-700 uppercase">Principais Queixas</h2>
                <p className="text-xs text-slate-400 mt-1">Contagem por queixa informada</p>
              </div>
              <MoreVertical className="w-4 h-4 text-slate-400 cursor-pointer print:hidden" />
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.queixasData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={90}
                    dataKey="value"
                    label={({name, value}) => `${name} (${value})`}
                    labelLine={true}
                    className="text-[11px] font-medium"
                    isAnimationActive={false}
                  >
                    {stats.queixasData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={BI_COLORS[(index + 2) % BI_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', color: '#FFF', borderRadius: '4px', border: 'none' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default App;