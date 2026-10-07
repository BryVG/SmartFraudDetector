from flask import Flask, request, jsonify

from services.feature_service import FeatureService
from services.scoring_service import ScoringService
from services.explanation_service import ExplanationService
from services.analysis_service import AnalysisService


app = Flask(__name__)


feature_service = FeatureService()

scoring_service = ScoringService(
    feature_service
)

explanation_service = ExplanationService(
    feature_service.metadata
)

analysis_service = AnalysisService(
    feature_service=feature_service,
    scoring_service=scoring_service,
    explanation_service=explanation_service
)


@app.post("/api/analisar")
def analisar():

    dados = request.get_json()

    resultado = analysis_service.analisar(
        descricao=dados["descricao"],
        unidade=dados.get("unidade"),
        preco=float(dados["preco"]),
        quantidade=float(dados["quantidade"]),
        valor_total=(
            float(dados["valor_total"])
            if dados.get("valor_total") is not None
            else None
        ),
        fornecedor=str(dados["fornecedor"]),
        orgao=str(dados["orgao"]),
        data_compra=dados["data_compra"],
        numeroControlePNCP=dados["numeroControlePNCP"]
    )

    return jsonify(resultado)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )