const apiKey = "test_98773fdbb7fb5492215ffe7d140666";
const apiBaseUrl = "https://api.api-futebol.com.br/v1";

/** @typedef {Record<string, any>} Partida */

/**
 *
 * @param {string} endpoint
 * @param {RequestInit} args
 * @returns {Promise<any>}
 */
const apiFutebol = async (endpoint, args) => {
  return fetch(apiBaseUrl + endpoint, {
    ...args,
    headers: { Authorization: `Bearer ${apiKey}`, ...args?.headers },
  }).then((res) => res.json());
};

/**
 *
 * @param {{ ida: any }} obj
 * @returns {Partida}
 */
function recuperarValorDaChaveIda(obj) {
  return obj["ida"];
}

/**
 *
 * @param {string} chave
 * @returns {(itemAnterior: Partida, itemAtual: Partida) => Record<string, Partida>}
 */
function agruparPorChave(chave) {
  return (itemAnterior, itemAtual) => {
    const valor = itemAtual[chave];
    if (itemAnterior[valor]) {
      itemAnterior[valor].push(itemAtual);
    } else {
      itemAnterior[valor] = [itemAtual];
    }
    return itemAnterior;
  };
}

/**
 *
 * @param {Array<Partida>} partidas
 * @param {string} chave
 * @returns {Array<Partida>}
 */
function agruparPartidas(partidas, chave) {
  const fasesCampeonato = Object.entries(partidas.partidas.partidas);
  for (const i in fasesCampeonato) {
    fasesCampeonato[i][1] = Object.values(fasesCampeonato[i][1])
      .map(recuperarValorDaChaveIda)
      .reduce(agruparPorChave(chave), {});
  }
  return Object.fromEntries(fasesCampeonato);
}

function formatarDataISOParaString(dataISO) {
  const hoje = new Date();
  const data = new Date(dataISO);
  const rtf = new Intl.RelativeTimeFormat("pt-BR", {
    localeMatcher: "lookup",
  });
  return rtf.format(data.getDate() - hoje.getDate(), "day");
}

function partidasDaSemana(listaDePartidas) {
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);
}

const mock = {
  "primeira-fase": {
    "26/11/2023": [
      {
        partida_id: 8958,
        time_mandante: {
          time_id: 108,
          nome_popular: "Campinense",
          sigla: "CAM",
          escudo: "https://cdn.api-futebol.com.br/escudos/638d34be71fd2.svg",
        },
        time_visitante: {
          time_id: 45,
          nome_popular: "Grêmio",
          sigla: "GRE",
          escudo: "https://cdn.api-futebol.com.br/escudos/638d349c32bf1.svg",
        },
        status: "finalizado",
        slug: "campinense-gremio-01-03-2023",
        data_realizacao: "01/03/2023",
        hora_realizacao: "20:00",
        data_realizacao_iso: "2023-03-01T20:00:00-0300",
        _link: "/v1/partidas/8958",
      },
    ],
    "28/11/2023": [
      {
        partida_id: 8959,
        time_mandante: {
          time_id: 19,
          nome_popular: "Resende",
          sigla: "RES",
          escudo: "https://cdn.api-futebol.com.br/escudos/638d348ea4e4e.svg",
        },
        time_visitante: {
          time_id: 256,
          nome_popular: "Ferroviário",
          sigla: "FER",
          escudo: "https://cdn.api-futebol.com.br/escudos/638d34f365b2f.png",
        },
        status: "finalizado",
        slug: "resende-ferroviario-28-02-2023",
        data_realizacao: "28/02/2023",
        hora_realizacao: "15:30",
        data_realizacao_iso: "2023-02-28T15:30:00-0300",
        _link: "/v1/partidas/8959",
      },
    ],
  },
};

async function bootstrap() {
  const campeonatos = await apiFutebol("/campeonatos");
  const [campeonatoSerieB] = campeonatos;
  const listaDePartidas = await apiFutebol(
    `/campeonatos/${campeonatoSerieB.campeonato_id}/partidas`
  );
  const partidasAgrupadasPorData = agruparPartidas(
    listaDePartidas,
    "data_realizacao"
  );
  // console.log(
  //   JSON.stringify(obterPartidasDaSemana(partidasAgrupadasPorData), null, 2)
  // );
}
// bootstrap();

const hoje = new Date();
const depoisDeAmanha = new Date();
depoisDeAmanha.setDate(hoje.getDate() + 3);
console.log(formatarDataISOParaString(depoisDeAmanha));

// /**
//  *
//  * @param {number[]} nums
//  * @returns {number}
//  */
// function removerDuplicatas(nums) {
//   let ponteiro = 0;
//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] !== nums[ponteiro]) {
//       ponteiro++;
//       nums[ponteiro] = nums[i];
//     }
//   }

//   for (let i = ponteiro + 1; i < nums.length; i++) {
//     nums[i] = null;
//   }

//   console.log(nums);
//   return ponteiro + 1;
// }

// console.log(removerDuplicatas([0, 1, 1, 1, 1, 1, 1, 2, 2, 3]));

/**
 * resultado:
{
  "primeira-fase": {
    "01/03/2023": [
      {
        "partida_id": 8958,
        "time_mandante": {
          "time_id": 108,
          "nome_popular": "Campinense",
          "sigla": "CAM",
          "escudo": "https://cdn.api-futebol.com.br/escudos/638d34be71fd2.svg"
        },
        "time_visitante": {
          "time_id": 45,
          "nome_popular": "Grêmio",
          "sigla": "GRE",
          "escudo": "https://cdn.api-futebol.com.br/escudos/638d349c32bf1.svg"
        },
        "status": "finalizado",
        "slug": "campinense-gremio-01-03-2023",
        "data_realizacao": "01/03/2023",
        "hora_realizacao": "20:00",
        "data_realizacao_iso": "2023-03-01T20:00:00-0300",
        "_link": "/v1/partidas/8958"
      }
    ],
    "28/02/2023": [
      {
        "partida_id": 8959,
        "time_mandante": {
          "time_id": 19,
          "nome_popular": "Resende",
          "sigla": "RES",
          "escudo": "https://cdn.api-futebol.com.br/escudos/638d348ea4e4e.svg"
        },
        "time_visitante": {
          "time_id": 256,
          "nome_popular": "Ferroviário",
          "sigla": "FER",
          "escudo": "https://cdn.api-futebol.com.br/escudos/638d34f365b2f.png"
        },
        "status": "finalizado",
        "slug": "resende-ferroviario-28-02-2023",
        "data_realizacao": "28/02/2023",
        "hora_realizacao": "15:30",
        "data_realizacao_iso": "2023-02-28T15:30:00-0300",
        "_link": "/v1/partidas/8959"
      }
    ]
  }
}
*/
