import numpy as np


class ExplanationService:

    def __init__(self, metadata):

        self.metadata = metadata

    def classificar_evidencia(self, score):

        regras = self.metadata["regras_estatisticas"]

        if score < regras["score_normal_max"]:
            return "NORMAL"

        if score < regras["score_atencao_max"]:
            return "ATENCAO"

        return "ANOMALIA"

    def calcular_evidencia_preco(self, score_preco):

        return float(
            1 -
            np.exp(-score_preco / 3)
        )

    def calcular_evidencia_quantidade(
        self,
        score_quantidade
    ):

        return float(
            1 -
            np.exp(-score_quantidade / 3)
        )

    def calcular_evidencia_consistencia(
        self,
        diferenca_relativa
    ):

        return float(
            1 -
            np.exp(-diferenca_relativa / 0.25)
        )

    def classificar_prioridade(
        self,
        evidencia_estatistica,
        classificacao_iforest
    ):

        evidencia_alta = evidencia_estatistica in [
            "ELEVADA",
            "MUITO_ELEVADA"
        ]

        isolamento_alto = classificacao_iforest in [
            "ISOLAMENTO_ALTO",
            "ISOLAMENTO_MUITO_ALTO"
        ]

        if evidencia_alta and isolamento_alto:
            return "ALTA"

        if evidencia_alta or isolamento_alto:
            return "MEDIA"

        return "BAIXA"
        
    def gerar_evidencias(
        self,
        features,
        preco,
        quantidade,
        valor_total
    ):
        score_preco = features["log_desvio_preco"]
        score_quantidade = features["log_desvio_quantidade"]

        evidencia_preco = self.calcular_evidencia_preco(
            score_preco
        )

        evidencia_quantidade = self.calcular_evidencia_quantidade(
            score_quantidade
        )

        # Consistência entre quantidade × preço × total
        if valor_total is None:
            evidencia_consistencia = 0.0
        elif valor_total == 0:
            evidencia_consistencia = 0.0
        else:
            total_calculado = preco * quantidade

            diferenca_relativa = (
                abs(total_calculado - valor_total)
                / abs(valor_total)
            )

            evidencia_consistencia = (
                self.calcular_evidencia_consistencia(
                    diferenca_relativa
                )
            )

        return {
            "preco": float(evidencia_preco),
            "quantidade": float(evidencia_quantidade),
            "consistencia": float(evidencia_consistencia)
        }
            
    def calcular_score_investigacao(
        self,
        evidencias
    ):
        pesos = self.metadata["pesos_investigacao"]

        score = (
            evidencias["preco"] *
            pesos["preco"]
            +
            evidencias["quantidade"] *
            pesos["quantidade"]
            +
            evidencias["consistencia"] *
            pesos["consistencia"]
        )

        return float(score)
    
    def gerar_resultado(
        self,
        evidencias,
        score_investigacao,
        classificacao_iforest
    ):
        evidencia_estatistica = max(
            evidencias.values()
        )

        if evidencia_estatistica >= 0.75:
            classificacao = "MUITO_ELEVADA"
        elif evidencia_estatistica >= 0.50:
            classificacao = "ELEVADA"
        elif evidencia_estatistica >= 0.25:
            classificacao = "MODERADA"
        else:
            classificacao = "BAIXA"

        prioridade = self.classificar_prioridade(
            evidencia_estatistica=classificacao,
            classificacao_iforest=classificacao_iforest
        )

        return {
            "evidencia_estatistica": classificacao,
            "prioridade_investigacao": prioridade,
            "score_investigacao": float(score_investigacao),
            "classificacao_iforest": classificacao_iforest
        }