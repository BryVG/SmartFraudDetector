
import numpy as np
import pandas as pd


class ScoringService:

    def __init__(self, feature_service):

        self.feature_service = feature_service

        self.model = feature_service.model
        self.features = feature_service.features
        self.metadata = feature_service.metadata

        self.scores_historicos = -np.array(
            self.metadata["score_iforest"][
                "scores_historicos_ordenados"
            ]
        )

        self.scores_historicos.sort()

        self.p75 = np.percentile(
            self.scores_historicos,
            75
        )

        self.p90 = np.percentile(
            self.scores_historicos,
            90
        )

        self.p95 = np.percentile(
            self.scores_historicos,
            95
        )

    def calcular_score(self, features):

        # Garantir ordem exatamente igual à do treinamento
        valores = [
            features[feature]
            for feature in self.features
        ]

        X = pd.DataFrame(
            [valores],
            columns=self.features
        )

        # Score original do Isolation Forest
        decision_function = self.model.decision_function(X)

        # No treinamento usamos:
        # score = -decision_function
        score = float(-decision_function[0])

        # ========================================================
        # PERCENTIL HISTÓRICO
        # ========================================================

        percentil = (
            np.searchsorted(
                self.scores_historicos,
                score,
                side="right"
            )
            /
            len(self.scores_historicos)
        )

        # ========================================================
        # CLASSIFICAÇÃO
        # ========================================================

        if score < self.p75:

            classificacao = "BAIXO_ISOLAMENTO"

        elif score < self.p90:

            classificacao = "ISOLAMENTO_MODERADO"

        elif score < self.p95:

            classificacao = "ISOLAMENTO_ALTO"

        else:

            classificacao = "ISOLAMENTO_MUITO_ALTO"

        return {
            "score_iforest": score,
            "percentil_iforest": float(percentil),
            "classificacao_iforest": classificacao
        }
