import joblib
import pandas as pd


class FeatureService:

    def __init__(self):
        self.model_path = "artifacts/isolation_forest_final.joblib"
        self.features_path = "artifacts/features_iforest_final.joblib"
        self.metadata_path = "artifacts/metadata_modelo.joblib"

        self.historico_api_path = "artifacts/historico_api.parquet"
        self.referencias_preco_path = "artifacts/referencias_preco.parquet"
        self.referencias_quantidade_path = "artifacts/referencias_quantidade.parquet"
        self.historico_fornecedor_path = "artifacts/historico_fornecedor.parquet"
        self.historico_orgao_path = "artifacts/historico_orgao.parquet"
        self.historico_concorrencia_path = "artifacts/historico_concorrencia.parquet"
        self.historico_temporal_path = "artifacts/historico_temporal.parquet"
        self.historico_contratos_path = "artifacts/historico_contratos.parquet"

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

        resultado = referencias[
            (referencias["descricao_normalizada"] == descricao)
            &
            (
                referencias["unidadeMedida"].fillna("").astype(str)
                == str(unidade)
            )
        ]

        if resultado.empty:
            return None

        return resultado.iloc[0].to_dict()