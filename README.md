# NutriReceitas — Frontend React

Sistema de receitas saudáveis para nutricionista, com área pública e painel administrativo.

## Tecnologias

- React 18
- React Router DOM v6
- Axios
- CSS Modules

## Estrutura de Pastas

```
src/
├── components/
│   ├── common/        # Button, Modal, Badge, FormField, CheckboxGroup, Feedback
│   ├── layout/        # Navbar, AdminLayout
│   ├── receitas/      # ReceitaCard, ReceitaModal, ReceitaForm, ReceitaTabela
│   └── pacientes/     # PacienteForm, PacienteTabela, PacienteModal
├── context/           # ToastContext (notificações globais)
├── hooks/             # useReceitas, usePacientes
├── pages/
│   ├── public/        # HomePage, ReceitasPage
│   └── admin/         # DashboardPage, ReceitasAdminPage, PacientesAdminPage
├── services/          # api.js, receitaService.js, pacienteService.js
├── styles/            # global.css
└── utils/             # helpers.js (IMC, datas, constantes)
```

## Instalação e execução

```bash
cp .env.example .env
npm install
npm start
```

## Contratos de API esperados

### Receita
- `GET    /api/receitas`            — lista todas
- `GET    /api/receitas/publicas`   — lista publicadas (área pública)
- `GET    /api/receitas/:id`
- `POST   /api/receitas`
- `PUT    /api/receitas/:id`
- `DELETE /api/receitas/:id`

### Paciente
- `GET    /api/pacientes`
- `GET    /api/pacientes/:id`
- `POST   /api/pacientes`
- `PUT    /api/pacientes/:id`
- `DELETE /api/pacientes/:id`
- `GET    /api/pacientes/:id/historico-peso`
- `POST   /api/pacientes/:id/historico-peso`
- `DELETE /api/pacientes/:id/historico-peso/:registroId`

## Campos esperados no DTO de Receita

| Campo               | Tipo     |
|---------------------|----------|
| id                  | Long     |
| nome                | String   |
| segmento            | Enum     |
| descricao           | String   |
| urlImagem           | String   |
| status              | Enum     |
| calorias            | Integer  |
| porcaoGramas        | Integer  |
| rendimentoPorcoes   | Integer  |
| proteinas           | Double   |
| carboidratos        | Double   |
| gorduras            | Double   |
| tempoPreparo        | Integer  |
| dificuldade         | Enum     |
| ingredientes        | String[] |
| modoPreparo         | String   |
| tagsDieteticas      | String[] |
| dataCadastro        | String   |

### Enums
- `segmento`: CAFE_MANHA, ALMOCO, LANCHE_SALGADO, LANCHE_DOCE, JANTAR, CEIA
- `status`: PUBLICADA, RASCUNHO
- `dificuldade`: FACIL, MEDIO, DIFICIL

## Campos esperados no DTO de Paciente

| Campo                  | Tipo     |
|------------------------|----------|
| id                     | Long     |
| nome                   | String   |
| dataNascimento         | String   |
| email                  | String   |
| telefone               | String   |
| pesoAtual              | Double   |
| altura                 | Integer  |
| pesoMeta               | Double   |
| dataConsulta           | String   |
| objetivo               | String   |
| status                 | Enum     |
| restricoesAlimentares  | String[] |
| observacoes            | String   |
| historicoPeso          | RegistroPeso[] |

### RegistroPeso
| Campo      | Tipo   |
|------------|--------|
| id         | Long   |
| data       | String |
| peso       | Double |
| observacao | String |
