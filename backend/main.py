from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Promotional Item Quote Engine")

# CORS 설정 (프론트엔드 연동)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ItemPriceTier(BaseModel):
    min_qty: int
    unit_price: int

class SellerOffer(BaseModel):
    seller_name: str
    product_url: str
    price_tiers: List[ItemPriceTier]
    base_print_cost: int = 0
    plate_cost: int = 0
    delivery_fee: int = 0

class QuoteRequest(BaseModel):
    quantity: int
    print_option: bool = True
    offers: List[SellerOffer]

@app.post("/api/calculate-quote")
def calculate_quote(req: QuoteRequest):
    results = []
    
    for offer in req.offers:
        # 해당 수량에 맞는 구간 단가 찾기
        applicable_tier = None
        sorted_tiers = sorted(offer.price_tiers, key=lambda x: x.min_qty, reverse=True)
        
        for tier in sorted_tiers:
            if req.quantity >= tier.min_qty:
                applicable_tier = tier
                break
                
        if not applicable_tier:
            continue

        base_item_price = applicable_tier.unit_price * req.quantity
        print_cost = offer.base_print_cost if req.print_option else 0
        plate_cost = offer.plate_cost if req.print_option else 0
        
        supply_price = base_item_price + print_cost + plate_cost + offer.delivery_fee
        vat = int(supply_price * 0.1)
        total_price = supply_price + vat
        effective_unit_price = round(total_price / req.quantity)

        results.append({
            "seller_name": offer.seller_name,
            "product_url": offer.product_url,
            "matched_unit_price": applicable_tier.unit_price,
            "total_supply_price": supply_price,
            "vat": vat,
            "total_price": total_price,
            "effective_unit_price": effective_unit_price
        })

    # 최저가순 정렬
    results.sort(key=lambda x: x["total_price"])
    if results:
        results[0]["is_lowest"] = True

    return {"quantity": req.quantity, "quotes": results}
