
export type RiskItem = {
  fraudAnalysis: {
    suspicious: boolean;
  }[];
};

export function calculateRisk(items: RiskItem[]) {

        let total = 0;
        let suspicious = 0;

        for (const item of items) {
            total++;
            if (item.fraudAnalysis.some(analysis => analysis.suspicious)) {
                suspicious++;
            }
        }

        const rate = total > 0 ? (suspicious / total) * 100 : 0;

        return {
            
            total,
            suspicious,
            rate
        };
    }