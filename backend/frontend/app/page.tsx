'use client';

import React, { useState } from 'react';

export default function ComparePage() {
  const [quantity, setQuantity] = useState<number>(500);
  const [includePrint, setIncludePrint] = useState<boolean>(true);

  // 예시 비교 데이터 (고려기프트 vs 기프트한국)
  const offers = [
    {
      seller_name: '고려기프트',
      product_url: 'https://koreagift.com',
      unit_price: 1800,
      print_cost: 0,
      plate_cost: 15000,
      delivery_fee: 3000,
    },
    {
      seller_name: '기프트한국',
      product_url: 'http://gifthanguk.com',
      unit_price: 1750,
      print_cost: 10000,
      plate_cost: 10000,
      delivery_fee: 0,
    },
  ];

  const calculateTotal = (offer: typeof offers[0]) => {
    const base = offer.unit_price * quantity;
    const print = includePrint ? offer.print_cost : 0;
    const plate = includePrint ? offer.plate_cost : 0;
    const supply = base + print + plate + offer.delivery_fee;
    const vat = Math.floor(supply * 0.1);
    const total = supply + vat;
    return {
      total,
      unit: Math.round(total / quantity),
    };
  };

  const results = offers.map((o) => ({ ...o, ...calculateTotal(o) })).sort((a, b) => a.total - b.total);

  return (
    <main className="min-h-screen bg-gray-50 p-4 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">🎁 판촉물 실시간 최저가 비교</h1>
        <p className="text-sm text-gray-500">스텐 보틀 500ml (총견적 산출기)</p>
      </header>

      {/* 수량 및 옵션 선택 */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">주문 수량 (개)</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded-lg text-sm font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-medium text-gray-700">인쇄 옵션 포함</span>
          <input
            type="checkbox"
            checked={includePrint}
            onChange={(e) => setIncludePrint(e.target.checked)}
            className="w-5 h-5 text-blue-600 rounded"
          />
        </div>
      </div>

      {/* 최저가 비교 카드 리스트 */}
      <div className="space-y-3">
        {results.map((item, idx) => (
          <div
            key={item.seller_name}
            className={`p-4 rounded-xl border bg-white shadow-sm relative ${
              idx === 0 ? 'border-2 border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
            }`}
          >
            {idx === 0 && (
              <span className="absolute -top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                실질 최저가
              </span>
            )}

            <div className="flex justify-between items-start mb-2">
              <h2 className="font-bold text-gray-800">{item.seller_name}</h2>
              <a
                href={item.product_url}
                target="_blank"
                className="text-xs text-blue-500 underline"
              >
                상품 보기 ↗
              </a>
            </div>

            <div className="border-t pt-2 mt-2 space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>개당 실질 단가 (VAT포함):</span>
                <span className="font-semibold text-gray-900">{item.unit.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-1 border-t">
                <span className="text-gray-800">최종 결제 예정 금액:</span>
                <span className="text-blue-600">{item.total.toLocaleString()}원</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
