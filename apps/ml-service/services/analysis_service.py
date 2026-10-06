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

        resultado_score = (
            self.scoring_service.calcular_score(
                features
            )
        )

        evidencias = (
            self.explanation_service.gerar_evidencias(
                features=features,
                preco=preco,
                quantidade=quantidade,
                valor_total=valor_total
            )
        )

        score_investigacao = (
            self.explanation_service
            .calcular_score_investigacao(
                evidencias
            )
        )

        resultado_explicacao = (
            self.explanation_service.gerar_resultado(
                evidencias=evidencias,
                score_investigacao=score_investigacao,
                classificacao_iforest=resultado_score[
                    "classificacao_iforest"
                ]
            )
        )

        return {
            **resultado_score,
            **resultado_explicacao,
            "evidencias": evidencias
        }