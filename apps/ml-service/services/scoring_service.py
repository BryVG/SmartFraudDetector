import numpy as np
import pandas as pd


class ScoringService:

    def __init__(self, feature_service):

        self.feature_service = feature_service

        self.model = feature_service.model
        self.features = feature_service.features

        # Configuração oficial do modelo final
        self.config = feature_service.config

        # Scores históricos do Isolation Forest.
        # São utilizados somente para transformar o score
        # bruto do modelo em evidência percentual.
        metadata_auxiliar = feature_service.metadata_auxiliar

        self.scores_historicos = np.array(
            metadata_auxiliar["score_iforest"][
                "scores_historicos_ordenados"
            ],
            dtype=float
        )

        self.scores_historicos.sort()

    def calcular_score_isolation(self, features):

        valores = [
            features[feature]
            for feature in self.features
        ]

        X = pd.DataFrame(
            [valores],
            columns=self.features
        )

        decision_function = self.model.decision_function(X)

        score_iforest = float(
            -decision_function[0]
        )

        # Percentil relativo ao conjunto histórico
        percentil = (
            np.searchsorted(
                self.scores_historicos,
                score_iforest,
                side="right"
            )
            / len(self.scores_historicos)
        )

        evidencia_isolation = float(percentil)

        return {
            "score_iforest": score_iforest,
            "evidencia_isolation": evidencia_isolation,
            "percentil_iforest": float(percentil)
        }

    def calcular_evidencia_estrutural(self, features):

        componentes = []

        # ------------------------------------------------------------------
        # Concorrência
        # ------------------------------------------------------------------

        log_desvio_concorrencia = features.get(
            "log_desvio_concorrencia_v2"
        )

        if log_desvio_concorrencia is not None:
            valor = (
                1
                - np.exp(
                    -float(log_desvio_concorrencia) / 1.0
                )
            )

            componentes.append(valor)

        # ------------------------------------------------------------------
        # Contrato
        # ------------------------------------------------------------------

        log_score_contrato = features.get(
            "log_score_contrato_orgao_v2"
        )

        if log_score_contrato is not None:
            valor = (
                1
                - np.exp(
                    -float(log_score_contrato) / 2.0
                )
            )

            componentes.append(valor)

        # ------------------------------------------------------------------
        # Órgão × quantidade
        # ------------------------------------------------------------------

        log_qty_orgao = features.get(
            "log_qty_vs_orgao_hist_v2"
        )

        if log_qty_orgao is not None:
            valor = (
                1
                - np.exp(
                    -float(log_qty_orgao) / 2.0
                )
            )

            componentes.append(valor)

        # ------------------------------------------------------------------
        # Fornecedor
        # ------------------------------------------------------------------

        share_fornecedor = float(
            features.get(
                "share_hist_pf_v2",
                0.0
            )
            or 0.0
        )

        fornecedor_exclusivo = float(
            features.get(
                "produto_fornecedor_exclusivo_hist_v2",
                0.0
            )
            or 0.0
        )

        fornecedor = (
            share_fornecedor * 0.5
            + fornecedor_exclusivo * 0.5
        )

        componentes.append(fornecedor)

        # ------------------------------------------------------------------
        # Evidência estrutural final
        # ------------------------------------------------------------------

        if not componentes:
            return 0.0

        return float(
            np.mean(componentes)
        )

    def calcular_score(self, features, confiabilidade_unidade=1.0):

        resultado_isolation = (
            self.calcular_score_isolation(features)
        )

        evidencia_isolation = (
            resultado_isolation["evidencia_isolation"]
        )

        # --------------------------------------------------------------
        # Evidências estatísticas
        # --------------------------------------------------------------

        log_desvio_preco = float(
            features.get(
                "log_desvio_preco",
                0.0
            )
        )

        log_desvio_quantidade = float(
            features.get(
                "log_desvio_quantidade",
                0.0
            )
        )

        log_diferenca_total = float(
            features.get(
                "log_diferenca_total_v2",
                0.0
            )
        )

        # Mesma transformação utilizada no treinamento final

        evidencia_preco = (
            1
            - np.exp(
                -log_desvio_preco / 3.0
            )
        )

        evidencia_quantidade = (
            1
            - np.exp(
                -log_desvio_quantidade / 3.0
            )
        )

        evidencia_consistencia = (
            1
            - np.exp(
                -log_diferenca_total / 0.25
            )
        )

        # Registros sem unidade possuem menor confiabilidade
        evidencia_inconsistencia_ajustada = (
            evidencia_consistencia
            * float(confiabilidade_unidade)
        )

        evidencia_estatistica = (
            evidencia_preco * 0.40
            + evidencia_quantidade * 0.30
            + evidencia_inconsistencia_ajustada * 0.30
        )

        # --------------------------------------------------------------
        # Evidência estrutural
        # --------------------------------------------------------------

        evidencia_estrutural = (
            self.calcular_evidencia_estrutural(features)
        )

        # --------------------------------------------------------------
        # Score final
        # --------------------------------------------------------------

        score_investigacao = (
            evidencia_estatistica * 0.40
            + evidencia_isolation * 0.30
            + evidencia_estrutural * 0.30
        )

        # --------------------------------------------------------------
        # Classificação final
        # --------------------------------------------------------------

        p75 = self.config["thresholds"]["p75"]
        p90 = self.config["thresholds"]["p90"]
        p95 = self.config["thresholds"]["p95"]

        if score_investigacao < p75:

            prioridade = "BAIXO"

        elif score_investigacao < p90:

            prioridade = "MODERADO"

        elif score_investigacao < p95:

            prioridade = "ALTO"

        else:

            prioridade = "MUITO_ALTO"

        return {
            **resultado_isolation,

            "evidencia_preco": float(
                evidencia_preco
            ),

            "evidencia_quantidade": float(
                evidencia_quantidade
            ),

            "evidencia_inconsistencia_ajustada": float(
                evidencia_inconsistencia_ajustada
            ),

            "evidencia_estatistica": float(
                evidencia_estatistica
            ),

            "evidencia_estrutural": float(
                evidencia_estrutural
            ),
            
            "confiabilidade_unidade": float(
            confiabilidade_unidade
            ),

            "score_investigacao": float(
                score_investigacao
            ),

            "prioridade_investigacao": prioridade,
            
        }