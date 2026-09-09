import { Boxes, Cross, MapPinned, PackageCheck, Plane, Truck, type LucideIcon } from 'lucide-react-native';

export type ServiceDefinition = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: LucideIcon;
};

export const services: ServiceDefinition[] = [
  { slug: 'transporte-rodoviario', title: 'Transporte Rodoviário', shortDescription: 'Operação terrestre para conectar sua carga aos principais destinos.', description: 'Soluções rodoviárias planejadas conforme a rota, o perfil da carga e a necessidade operacional de cada cliente.', icon: Truck },
  { slug: 'carga-dedicada', title: 'Carga Dedicada', shortDescription: 'Veículo e operação direcionados à necessidade da sua empresa.', description: 'Atendimento dedicado para operações que precisam de planejamento exclusivo, agilidade e acompanhamento próximo.', icon: PackageCheck },
  { slug: 'carga-fracionada', title: 'Carga Fracionada', shortDescription: 'Eficiência para remessas que compartilham a capacidade do veículo.', description: 'Alternativa para cargas menores, organizada para equilibrar prazo, cobertura e eficiência de transporte.', icon: Boxes },
  { slug: 'frete-aereo', title: 'Frete Aéreo', shortDescription: 'Modal para demandas que exigem maior velocidade.', description: 'Coordenação logística para cargas com prazos críticos, respeitando as exigências e particularidades do modal aéreo.', icon: Plane },
  { slug: 'produtos-controlados', title: 'Produtos Controlados', shortDescription: 'Processos atentos às exigências de cargas especiais.', description: 'Operações conduzidas conforme documentação, requisitos e controles aplicáveis ao perfil do produto transportado.', icon: Cross },
  { slug: 'rastreamento', title: 'Rastreamento', shortDescription: 'Visibilidade da carga preparada para integração em tempo real.', description: 'A arquitetura do aplicativo está pronta para exibir os eventos reais da carga assim que a API oficial for conectada.', icon: MapPinned },
];
