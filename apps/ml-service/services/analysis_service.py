class AnalysisService:

    def __init__(
        self,
        feature_service,
        scoring_service,
        explanation_service
    ):
        self.feature_service = feature_service
        self.scoring_service = scoring_service
        self.explanation_service = explanation_service

    def analisar(
        self,
        descricao,
        unidade,
        preco,
        quantidade,
        valor_total,
        fornecedor,
        orgao,
        data_compra,
        numeroControlePNCP
    ):

        # ==============================================================
        # 1. CÁLCULO DAS FEATURES
        # ==============================================================

        features = (
            self.feature_service.calcular_features_completas(
                descricao=descricao,
                unidade=unidade,
                preco=preco,
                quantidade=quantidade,
                valor_total=valor_total,
                fornecedor=fornecedor,
                orgao=orgao,
                data_compra=data_compra,
                numeroControlePNCP=numeroControlePNCP
            )
        )

        # ==============================================================
        # 2. CONFIABILIDADE DA UNIDADE
        # ==============================================================

        # Unidade informada:
        #   evidência de inconsistência possui confiabilidade 1.0
        #
        # Unidade ausente:
        #   evidência de inconsistência recebe fator 0.30

        confiabilidade_unidade = (
            1.0
            if unidade is not None and str(unidade).strip() != ""
            else 0.30
        )

        # ==============================================================
        # 3. SCORE FINAL
        # ==============================================================

        resultado_score = (
            self.scoring_service.calcular_score(
                features=features,
                confiabilidade_unidade=confiabilidade_unidade
            )
        )

        # ==============================================================
        # 4. EXPLICAÇÃO
        # ==============================================================

        resultado_explicacao = (
            self.explanation_service.gerar_resultado(
                features=features,
                preco=preco,
                quantidade=quantidade,
                valor_total=valor_total,
                resultado_score=resultado_score
            )
        )

        # ==============================================================
        # 5. RESULTADO FINAL
        # ==============================================================

        return {
            **resultado_score,
            **resultado_explicacao
        }