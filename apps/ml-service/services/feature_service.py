import joblib
import pandas as pd
import numpy as np


class FeatureService:

    def __init__(self):
        self.model_path = "artifacts/isolation_forest_causal_31.joblib"
        self.features_path = "artifacts/features_iforest_causal_31.joblib"
        self.metadata_path = "artifacts/metadata_modelo_causal_31.joblib"

        self.historico_api_path = "artifacts/historico_api_causal.parquet"
        self.referencias_preco_path = "artifacts/referencias_preco_causal.parquet"
        self.referencias_quantidade_path = "artifacts/referencias_quantidade_causal.parquet"
        self.historico_fornecedor_path = "artifacts/historico_fornecedor_causal.parquet"
        self.historico_orgao_path = "artifacts/historico_orgao_causal.parquet"
        self.historico_concorrencia_path = "artifacts/historico_concorrencia_causal.parquet"
        self.historico_temporal_path = "artifacts/historico_temporal_causal.parquet"
        self.historico_contratos_path = "artifacts/historico_contratos_causal.parquet"

        self._carregar_artifacts()

    def _carregar_artifacts(self):

        print("Carregando modelo...")
        self.model = joblib.load(self.model_path)

        print("Carregando features...")
        self.features = joblib.load(self.features_path)

        print("Carregando metadata...")
        self.metadata = joblib.load(self.metadata_path)

        print("Carregando histórico da API...")
        self.historico_api = pd.read_parquet(
            self.historico_api_path
        )

        print("Carregando referências de preço...")
        self.referencias_preco = pd.read_parquet(
            self.referencias_preco_path
        )

        print("Carregando referências de quantidade...")
        self.referencias_quantidade = pd.read_parquet(
            self.referencias_quantidade_path
        )

        print("Carregando histórico de fornecedor...")
        self.historico_fornecedor = pd.read_parquet(
            self.historico_fornecedor_path
        )

        print("Carregando histórico de órgão...")
        self.historico_orgao = pd.read_parquet(
            self.historico_orgao_path
        )

        print("Carregando histórico de concorrência...")
        self.historico_concorrencia = pd.read_parquet(
            self.historico_concorrencia_path
        )

        print("Carregando histórico temporal...")
        self.historico_temporal = pd.read_parquet(
            self.historico_temporal_path
        )

        print("Carregando histórico de contratos...")
        self.historico_contratos = pd.read_parquet(
            self.historico_contratos_path
        )

        print("Artifacts carregados com sucesso.")
        
    def buscar_referencia_preco(self, descricao, unidade):

        referencias = self.referencias_preco

        if unidade is None or pd.isna(unidade):
            resultado = referencias[
                (referencias["descricao_normalizada"] == descricao)
                &
                (referencias["unidadeMedida"].isna())
            ]

        else:
            resultado = referencias[
                (referencias["descricao_normalizada"] == descricao)
                &
                (referencias["unidadeMedida"].astype(str) == str(unidade))
            ]

        if resultado.empty:
            return None

        return resultado.iloc[0].to_dict()
    def buscar_referencia_quantidade(self, descricao, unidade):

        referencias = self.referencias_quantidade

        if unidade is None or pd.isna(unidade):
            resultado = referencias[
                (referencias["descricao_normalizada"] == descricao)
                &
                (referencias["unidadeMedida"].isna())
            ]

        else:
            resultado = referencias[
                (referencias["descricao_normalizada"] == descricao)
                &
                (referencias["unidadeMedida"].astype(str) == str(unidade))
            ]

        if resultado.empty:
            return None

        return resultado.iloc[0].to_dict()
        
    def calcular_features_preco_quantidade(
        self,
        descricao,
        unidade,
        preco,
        quantidade
    ):

        import numpy as np

        referencia_preco = self.buscar_referencia_preco(
            descricao,
            unidade
        )

        referencia_quantidade = self.buscar_referencia_quantidade(
            descricao,
            unidade
        )

        if referencia_preco is None:
            raise ValueError(
                "Não foi encontrada referência histórica de preço "
                "para o produto informado."
            )

        if referencia_quantidade is None:
            raise ValueError(
                "Não foi encontrada referência histórica de quantidade "
                "para o produto informado."
            )

        # ============================================================
        # PREÇO
        # ============================================================

        log_preco = np.log1p(preco)

        distancia_log = abs(
            log_preco -
            referencia_preco["mediana_log"]
        )

        mediana_preco = np.expm1(
            referencia_preco["mediana_log"]
        )

        desvio_percentual_abs = abs(
            (preco / mediana_preco) - 1
        )

        log_desvio_preco = np.log1p(
            desvio_percentual_abs
        )

        # ============================================================
        # QUANTIDADE
        # ============================================================

        log_quantidade = np.log1p(quantidade)

        distancia_log_qtd = abs(
            log_quantidade -
            referencia_quantidade["mediana_log_qtd"]
        )

        mediana_quantidade = np.expm1(
            referencia_quantidade["mediana_log_qtd"]
        )

        desvio_percentual_quantidade_abs = abs(
            (quantidade / mediana_quantidade) - 1
        )

        log_desvio_quantidade = np.log1p(
            desvio_percentual_quantidade_abs
        )

        # ============================================================
        # RETORNO
        # ============================================================

        return {
            "log_preco": log_preco,
            "log_quantidade": log_quantidade,

            "distancia_log": distancia_log,
            "distancia_log_qtd": distancia_log_qtd,

            "quantidade_historico":
                referencia_quantidade["registros"],

            "log_desvio_preco": log_desvio_preco,
            "log_desvio_quantidade": log_desvio_quantidade
        }
    def calcular_features_consistencia(
        self,
        preco,
        quantidade,
        valor_total
    ):
        import numpy as np

        total_calculado = preco * quantidade

        if valor_total is None or pd.isna(valor_total):
            return {
                "log_diferenca_total_v2": 0.0,
                "total_sem_referencia_v2": 1
            }

        if valor_total == 0:
            return {
                "log_diferenca_total_v2": 0.0,
                "total_sem_referencia_v2": 1
            }

        diferenca_total_relativa = (
            abs(total_calculado - valor_total)
            / abs(valor_total)
        )

        log_diferenca_total_v2 = np.log1p(
            diferenca_total_relativa
        )

        return {
            "log_diferenca_total_v2": log_diferenca_total_v2,
            "total_sem_referencia_v2": 0
        }
    def calcular_feature_share_fornecedor(
        self,
        descricao,
        fornecedor,
        data_compra
    ):

        historico = self.historico_fornecedor.copy()

        data_compra = pd.to_datetime(data_compra)

        historico_anterior = historico[
            (historico["descricao_normalizada"] == descricao)
            &
            (historico["dataPublicacaoPncp"] < data_compra)
        ].copy()

        total_historico = historico_anterior[
            "_qtd_evento_fornecedor"
        ].sum()

        if total_historico < 3:

            return {
                "share_hist_pf_v2": self.metadata["referencias_neutras"][
                    "share_hist_pf_v2"
                ],
                "share_sem_referencia": 1
            }

        historico_fornecedor = historico_anterior[
            historico_anterior["niFornecedor"].astype(str)
            == str(fornecedor)
        ]

        quantidade_fornecedor = historico_fornecedor[
            "_qtd_evento_fornecedor"
        ].sum()

        share = quantidade_fornecedor / total_historico

        return {
            "share_hist_pf_v2": float(share),
            "share_sem_referencia": 0
        }
    
    def calcular_features_estrutura_fornecedor(
        self,
        descricao,
        fornecedor,
        data_compra
    ):
        historico = self.historico_fornecedor.copy()

        data_compra = pd.to_datetime(data_compra)

        historico_anterior = historico[
            (historico["descricao_normalizada"] == descricao)
            &
            (historico["dataPublicacaoPncp"] < data_compra)
        ].copy()

        neutros = self.metadata["referencias_neutras"]

        total_historico = historico_anterior[
            "_qtd_evento_fornecedor"
        ].sum()

        if total_historico < 3:
            return {
                "inverso_concentracao_hist_v2": neutros[
                    "inverso_concentracao_hist_v2"
                ],
                "produto_fornecedor_exclusivo_hist_v2": 0,
                "concentracao_sem_referencia": 1,
                "exclusivo_sem_referencia": 1
            }

        contagens = (
            historico_anterior
            .groupby("niFornecedor")["_qtd_evento_fornecedor"]
            .sum()
        )

        participacoes = contagens / total_historico

        hhi = (participacoes ** 2).sum()

        inverso_concentracao = 1 - hhi

        fornecedor = str(fornecedor)

        fornecedores_historicos = set(
            contagens.index.astype(str)
        )

        exclusivo = int(
            len(fornecedores_historicos) == 1
            and fornecedor in fornecedores_historicos
        )

        return {
            "inverso_concentracao_hist_v2": float(
                inverso_concentracao
            ),
            "produto_fornecedor_exclusivo_hist_v2": exclusivo,
            "concentracao_sem_referencia": 0,
            "exclusivo_sem_referencia": 0
        }
            
    def calcular_features_orgao_temporal(
        self,
        descricao,
        orgao,
        quantidade,
        data_compra,
        numeroControlePNCP
    ):
        data_compra = pd.to_datetime(data_compra)

        # ============================================================
        # ÓRGÃO × PRODUTO — HISTÓRICO CAUSAL
        # ============================================================

        historico_orgao = self.historico_orgao.copy()

        historico_orgao["dataPublicacaoPncp"] = pd.to_datetime(
            historico_orgao["dataPublicacaoPncp"]
        )

        historico_anterior = historico_orgao[
            (historico_orgao["orgaoEntidade.cnpj"].astype(str) == str(orgao))
            & (historico_orgao["descricao_normalizada"] == descricao)
            & (historico_orgao["dataPublicacaoPncp"] < data_compra)
        ]

        if len(historico_anterior) < 3:

            log_qty_vs_orgao = (
                self.metadata["referencias_neutras"]
                ["log_qty_vs_orgao_hist_v2"]
            )

            orgao_qty_sem_referencia = 1

        else:

            quantidade_media = pd.to_numeric(
                historico_anterior["quantidade"],
                errors="coerce"
            ).dropna().mean()

            if pd.isna(quantidade_media) or quantidade_media <= 0:

                log_qty_vs_orgao = (
                    self.metadata["referencias_neutras"]
                    ["log_qty_vs_orgao_hist_v2"]
                )

                orgao_qty_sem_referencia = 1

            else:

                razao_quantidade = float(quantidade) / quantidade_media

                log_qty_vs_orgao = np.log1p(razao_quantidade)

                orgao_qty_sem_referencia = 0

        # ============================================================
        # EVENTOS TEMPORAIS — MESMA LÓGICA DO MODELO 3.1
        # ============================================================

        historico_api = self.historico_api.copy()

        historico_api["dataPublicacaoPncp"] = pd.to_datetime(
            historico_api["dataPublicacaoPncp"]
        )

        # Cada numeroControlePNCP representa uma compra/evento.
        eventos = (
            historico_api[
                [
                    "numeroControlePNCP",
                    "dataPublicacaoPncp"
                ]
            ]
            .dropna(subset=["numeroControlePNCP"])
            .drop_duplicates("numeroControlePNCP")
            .copy()
        )

        # Mesmo ordenamento determinístico utilizado na reconstrução causal.
        eventos = eventos.sort_values(
            ["dataPublicacaoPncp", "numeroControlePNCP"]
        ).reset_index(drop=True)

        eventos["data"] = eventos["dataPublicacaoPncp"].dt.date

        eventos["registros_mesmo_dia_anteriores"] = (
            eventos.groupby("data").cumcount()
        )

        eventos["minuto"] = (
            eventos["dataPublicacaoPncp"].dt.floor("min")
        )

        eventos["registros_mesmo_minuto_anteriores"] = (
            eventos.groupby("minuto").cumcount()
        )

        evento_atual = eventos[
            eventos["numeroControlePNCP"].astype(str)
            == str(numeroControlePNCP)
        ]

        # ------------------------------------------------------------
        # Fallback:
        # se o número do controle não foi informado pelo método,
        # reproduzimos a posição temporal pelo timestamp.
        # ------------------------------------------------------------

        if evento_atual.empty:

            anteriores_dia = eventos[
                eventos["dataPublicacaoPncp"] < data_compra
            ]

            registros_mesmo_dia = (
                anteriores_dia[
                    anteriores_dia["data"]
                    == data_compra.date()
                ]["numeroControlePNCP"]
                .nunique()
            )

            registros_mesmo_minuto = (
                anteriores_dia[
                    anteriores_dia["dataPublicacaoPncp"].dt.floor("min")
                    == data_compra.floor("min")
                ]["numeroControlePNCP"]
                .nunique()
            )

        else:

            evento = evento_atual.iloc[0]

            registros_mesmo_dia = int(
                evento["registros_mesmo_dia_anteriores"]
            )

            registros_mesmo_minuto = int(
                evento["registros_mesmo_minuto_anteriores"]
            )

        log_registros_mesmo_dia = np.log1p(
            registros_mesmo_dia
        )

        log_contracts_same_minute = np.log1p(
            registros_mesmo_minuto
        )

        return {
            "log_qty_vs_orgao_hist_v2": log_qty_vs_orgao,
            "orgao_qty_sem_referencia_v2": orgao_qty_sem_referencia,
            "log_registros_mesmo_dia": log_registros_mesmo_dia,
            "log_contracts_same_minute": log_contracts_same_minute
        }

    def calcular_features_concorrencia_contrato(
        self,
        descricao,
        unidade,
        fornecedor,
        preco,
        orgao,
        data_compra
    ):
        import numpy as np

        data_compra = pd.to_datetime(data_compra)

        # ============================================================
        # CONCORRÊNCIA
        # ============================================================

        historico_concorrencia = self.historico_concorrencia.copy()

        historico_concorrencia["dataPublicacaoPncp"] = pd.to_datetime(
            historico_concorrencia["dataPublicacaoPncp"]
        )

        historico = historico_concorrencia[
            (historico_concorrencia["descricao_normalizada"] == descricao)
            &
            (
                historico_concorrencia["dataPublicacaoPncp"]
                < data_compra
            )
            &
            (
                historico_concorrencia["niFornecedor"].astype(str)
                != str(fornecedor)
            )
        ]

        if unidade is None or pd.isna(unidade):

            historico = historico[
                historico["unidadeMedida"].isna()
            ]

        else:

            historico = historico[
                historico["unidadeMedida"].astype(str)
                == str(unidade)
            ]

        if len(historico) < 3:

            log_desvio_concorrencia = self.metadata[
                "referencias_neutras"
            ]["log_desvio_concorrencia_v2"]

            concorrencia_sem_referencia = 1

        else:

            precos_historicos = (
                historico["valorUnitarioHomologado"]
                .astype(float)
            )

            media_log_concorrencia = np.log1p(
                precos_historicos
            ).mean()

            log_preco_atual = np.log1p(preco)

            desvio = abs(
                log_preco_atual -
                media_log_concorrencia
            )

            log_desvio_concorrencia = np.log1p(
                desvio
            )

            concorrencia_sem_referencia = 0

        # ============================================================
        # CONTRATO
        # ============================================================

        historico_contratos = self.historico_contratos.copy()

        historico_contratos["data_compra"] = pd.to_datetime(
            historico_contratos["data_compra"]
        )

        contratos_anteriores = historico_contratos[
            (
                historico_contratos["orgao_cnpj"].astype(str)
                == str(orgao)
            )
            &
            (
                historico_contratos["data_compra"]
                < data_compra
            )
        ]

        quantidade_contratos = len(contratos_anteriores)

        if quantidade_contratos < 3:

            log_score_contrato = self.metadata[
                "referencias_neutras"
            ]["log_score_contrato_orgao_v2"]

            log_contratos_orgao_hist = np.log1p(
                quantidade_contratos
            )

            contrato_sem_referencia = 1

        else:

            valores = pd.to_numeric(
                contratos_anteriores["valorGlobal"],
                errors="coerce"
            ).dropna()

            log_valores = np.log1p(
                valores.clip(lower=0)
            )

            mediana = np.median(log_valores)

            q1 = np.percentile(
                log_valores,
                25
            )

            q3 = np.percentile(
                log_valores,
                75
            )

            iqr = q3 - q1

            mad = np.median(
                np.abs(
                    log_valores - mediana
                )
            )

            escala = max(
                mad * 1.4826,
                iqr / 1.349,
                0.05
            )

            valor_atual = (
                historico_concorrencia[
                    historico_concorrencia[
                        "dataPublicacaoPncp"
                    ] == data_compra
                ]["valorUnitarioHomologado"]
            )

            # Para o MVP, usamos o valorGlobal da compra
            # quando disponível no histórico da API.
            compra_atual = self.historico_api[
                self.historico_api[
                    "dataPublicacaoPncp"
                ] == data_compra
            ]

            if compra_atual.empty:

                log_score_contrato = self.metadata[
                    "referencias_neutras"
                ]["log_score_contrato_orgao_v2"]

                contrato_sem_referencia = 1

            else:

                valor_global_atual = pd.to_numeric(
                    compra_atual["valorGlobal"],
                    errors="coerce"
                ).dropna()

                if valor_global_atual.empty:

                    log_score_contrato = self.metadata[
                        "referencias_neutras"
                    ]["log_score_contrato_orgao_v2"]

                    contrato_sem_referencia = 1

                else:

                    log_valor_atual = np.log1p(
                        float(valor_global_atual.iloc[0])
                    )

                    distancia_log_contrato = abs(
                        log_valor_atual - mediana
                    ) / escala

                    log_score_contrato = np.log1p(
                        distancia_log_contrato
                    )

                    contrato_sem_referencia = 0

                log_contratos_orgao_hist = np.log1p(
                    quantidade_contratos
                )
        return {
            "log_desvio_concorrencia_v2":
                log_desvio_concorrencia,

            "concorrencia_sem_referencia":
                concorrencia_sem_referencia,

            "log_score_contrato_orgao_v2":
                log_score_contrato,

            "log_contratos_orgao_hist":
                log_contratos_orgao_hist,

            "contrato_sem_referencia":
                contrato_sem_referencia
        }

    def calcular_features_completas(
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

        # ============================================================
        # 1. PREÇO + QUANTIDADE
        # ============================================================

        features_preco_quantidade = (
            self.calcular_features_preco_quantidade(
                descricao=descricao,
                unidade=unidade,
                preco=preco,
                quantidade=quantidade
            )
        )

        # ============================================================
        # 2. CONSISTÊNCIA DO TOTAL
        # ============================================================

        features_consistencia = (
            self.calcular_features_consistencia(
                preco=preco,
                quantidade=quantidade,
                valor_total=valor_total
            )
        )

        # ============================================================
        # 3. FORNECEDOR
        # ============================================================

        features_share = (
            self.calcular_feature_share_fornecedor(
                descricao=descricao,
                fornecedor=fornecedor,
                data_compra=data_compra
            )
        )

        features_estrutura = (
            self.calcular_features_estrutura_fornecedor(
                descricao=descricao,
                fornecedor=fornecedor,
                data_compra=data_compra
            )
        )

        # ============================================================
        # 4. ÓRGÃO + TEMPORAL
        # ============================================================

        features_orgao_temporal = (
            self.calcular_features_orgao_temporal(
                descricao=descricao,
                orgao=orgao,
                quantidade=quantidade,
                data_compra=data_compra,
                numeroControlePNCP=numeroControlePNCP
            )
        )

        # ============================================================
        # 5. CONCORRÊNCIA + CONTRATO
        # ============================================================

        features_concorrencia_contrato = (
            self.calcular_features_concorrencia_contrato(
                descricao=descricao,
                unidade=unidade,
                fornecedor=fornecedor,
                preco=preco,
                orgao=orgao,
                data_compra=data_compra
            )
        )

        # ============================================================
        # JUNTAR TODAS
        # ============================================================

        features = {}

        features.update(features_preco_quantidade)
        features.update(features_consistencia)
        features.update(features_share)
        features.update(features_estrutura)
        features.update(features_orgao_temporal)
        features.update(features_concorrencia_contrato)

        # ============================================================
        # GARANTIR EXATAMENTE AS 24 FEATURES DO MODELO
        # ============================================================

        features_final = {}

        for feature in self.features:

            if feature not in features:

                raise ValueError(
                    f"Feature obrigatória não calculada: {feature}"
                )

            features_final[feature] = features[feature]

        return features_final
    
    
