
# PT Rental Map 🇵🇹

### Mapa interativo de acessibilidade ao arrendamento em Portugal

O **PT Rental Map** é uma aplicação web que permite explorar a acessibilidade ao mercado de arrendamento nos municípios portugueses, através de dados estatísticos oficiais e de simulações personalizadas com base no rendimento do agregado familiar.

O projeto pretende tornar a informação sobre o mercado de arrendamento mais acessível, compreensível e fácil de explorar, ajudando os utilizadores a comparar diferentes municípios e a compreender o esforço financeiro associado à habitação.

---

## 🎯 Objetivos do projeto

- Disponibilizar um mapa interativo dos 308 municípios de Portugal.
- Consultar indicadores estatísticos relacionados com o mercado de arrendamento.
- Explorar diferenças territoriais nos valores de arrendamento.
- Permitir simulações com base no rendimento mensal do agregado familiar.
- Calcular a taxa de esforço estimada com a habitação.
- Facilitar a comparação entre municípios.
- Promover a utilização de dados oficiais e metodologias transparentes.

---

## ✨ Funcionalidades

### Implementadas

- Homepage com apresentação do projeto.
- Navegação entre páginas.
- Interface adaptável a desktop e dispositivos móveis.
- Mapa interativo de Portugal.
- Representação geográfica dos 308 municípios.
- Seleção de municípios no mapa.
- Consulta de informação municipal.
- Integração de dados estatísticos de arrendamento do INE.
- Perfil do agregado familiar.
- Introdução do rendimento mensal e da área da habitação.
- Estimativa de renda mensal.
- Cálculo da taxa de esforço.
- Apresentação de informação metodológica e fontes de dados.
- Notificação visual de confirmação da aplicação do perfil.

### Em desenvolvimento / planeadas

- Representação dos municípios através de cores de acordo com a acessibilidade ao arrendamento.
- Pesquisa de municípios no mapa.
- Filtros funcionais por taxa de esforço.
- Alternância entre mapa normal e vista de satélite.
- Melhorias na comparação entre municípios.
- Validação e testes funcionais.
- Otimização do desempenho e preparação para publicação.

---

## 🗺️ Dados geográficos

O projeto utiliza informação geográfica dos municípios portugueses, baseada na **Carta Administrativa Oficial de Portugal (CAOP) 2025**.

O ficheiro geográfico utilizado é:

```text
public/data/municipios.geojson
```

Este ficheiro contém os limites geográficos dos 308 municípios portugueses e é utilizado para representar os territórios no mapa interativo.

---

## 📊 Fontes de dados estatísticos

Os indicadores de arrendamento utilizados no projeto têm como fonte o **Instituto Nacional de Estatística (INE)**.

Entre os dados utilizados encontra-se o indicador:

- **INE — Indicador 0014771:** Valor mediano das rendas por m² de novos contratos de arrendamento nos últimos 12 meses.

Os dados estatísticos são organizados por município e ano de referência.

Ficheiro de dados:

```text
public/data/rendas-municipais.json
```

Os dados são apresentados com identificação da fonte, unidade de medida e período de referência, sempre que essa informação está disponível.

**Fontes:**

- [Instituto Nacional de Estatística (INE)](https://www.ine.pt/)
- [Direção-Geral do Território — CAOP](https://www.dgterritorio.gov.pt/)

---

## 🧮 Metodologia de cálculo

O projeto permite estimar o valor mensal de arrendamento e calcular a respetiva taxa de esforço, com base nos dados disponíveis e nas características introduzidas pelo utilizador.

### 1. Estimativa da renda mensal

A estimativa é calculada através da seguinte fórmula:

```text
Renda mensal estimada =
Valor mediano por m² × Área da habitação
```

Exemplo:

```text
Valor mediano: 10 €/m²
Área da habitação: 80 m²

Renda mensal estimada: 800 €
```

Este valor constitui uma estimativa matemática baseada no indicador municipal. Não representa necessariamente a renda efetiva de uma habitação específica.

### 2. Taxa de esforço

A taxa de esforço é calculada através da seguinte fórmula:

```text
Taxa de esforço (%) =
(Renda mensal estimada / Rendimento líquido mensal) × 100
```

Exemplo:

```text
Renda mensal estimada: 800 €
Rendimento líquido mensal: 2.000 €

Taxa de esforço: 40%
```

### 3. Classificação indicativa da acessibilidade

Para efeitos de visualização no protótipo, são utilizados os seguintes intervalos de referência:

| Taxa de esforço | Classificação |
|---|---|
| Até 25% | Boa acessibilidade |
| Mais de 25% até 35% | Acessibilidade moderada |
| Mais de 35% | Baixa acessibilidade |

Estes limiares são parâmetros indicativos do projeto, não constituindo limites legais ou universais.

### Nota metodológica

- A estimativa de renda depende da mediana municipal por metro quadrado e da área introduzida pelo utilizador.
- A estimativa não substitui a consulta de ofertas reais de habitação.
- Os resultados dependem da disponibilidade e atualidade dos dados estatísticos.
- Os municípios sem dados disponíveis devem ser identificados como tal.
- O rendimento utilizado no cálculo é o rendimento líquido mensal introduzido pelo utilizador.
- A dimensão do agregado familiar e a tipologia são informações de perfil e não devem ser usadas para inventar ou inferir valores de renda.

---

## 🛠️ Tecnologias utilizadas

O projeto é desenvolvido com as seguintes tecnologias:

| Tecnologia | Utilização |
|---|---|
| Next.js | Framework da aplicação |
| React | Construção da interface |
| TypeScript | Tipagem e organização do código |
| Tailwind CSS | Estilização e design responsivo |
| Leaflet | Cartografia e mapa interativo |
| Framer Motion | Animações e transições |
| Lucide React | Ícones |
| GeoJSON | Representação dos dados geográficos |

---

## 📁 Estrutura do projeto

A estrutura principal do projeto está organizada da seguinte forma:

```text
renda-certa-pt/
│
├── app/
│   ├── (public)/
│   │   ├── mapa/
│   │   ├── como-funciona/
│   │   ├── dados/
│   │   ├── sobre/
│   │   └── contacto/
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── map/
│   └── ui/
│
├── lib/
│
├── public/
│   ├── data/
│   │   ├── municipios.geojson
│   │   └── rendas-municipais.json
│   │
│   └── images/
│
├── scripts/
│
├── package.json
└── README.md
```

---

## 🚀 Instalação e execução

Para executar o projeto localmente, é necessário ter o Node.js e o npm instalados.

### 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### 2. Entrar na pasta do projeto

```bash
cd renda-certa-pt
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Abrir no navegador

A aplicação estará disponível em:

```text
http://localhost:3000
```

### 6. Criar uma versão de produção

Para verificar a compilação do projeto:

```bash
npm run build
```

---

## 📱 Design e experiência de utilização

A interface foi concebida para proporcionar uma experiência simples, intuitiva e responsiva.

O design utiliza uma identidade visual baseada em tons escuros e elementos de destaque em ciano, com especial atenção à legibilidade dos dados e à utilização do mapa.

Principais características:

- Interface adaptável a diferentes dimensões de ecrã.
- Navegação simples e intuitiva.
- Cartografia interativa.
- Apresentação clara dos indicadores.
- Identificação das fontes estatísticas.
- Transparência nos critérios de cálculo.

---

## ⚠️ Limitações

O PT Rental Map encontra-se em desenvolvimento.

Os resultados apresentados dependem da cobertura, qualidade e atualização das fontes estatísticas utilizadas.

As estimativas de renda não representam preços de anúncios individuais nem garantem que existam habitações disponíveis pelo valor calculado.

A classificação da acessibilidade é indicativa e deve ser interpretada no contexto da metodologia definida pelo projeto.

O projeto não substitui aconselhamento financeiro, imobiliário ou informação estatística oficial.

---

## 🔮 Próximos passos

O desenvolvimento continuará com especial atenção a:

1. Melhorar a visualização da acessibilidade ao arrendamento no mapa.
2. Completar a pesquisa e os filtros municipais.
3. Implementar a alternância de camadas cartográficas.
4. Validar a qualidade e cobertura dos dados.
5. Realizar testes de funcionamento e responsividade.
6. Preparar a aplicação para publicação.

---

## 👨‍💻 Estado do projeto

**Em desenvolvimento.**

O PT Rental Map é um projeto de tecnologia e análise territorial orientado para a exploração da acessibilidade ao arrendamento em Portugal.

---

## 📄 Licença

A licença de utilização e distribuição deste projeto ainda não foi definida.

