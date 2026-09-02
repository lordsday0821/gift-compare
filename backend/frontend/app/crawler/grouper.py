import imagehash
from PIL import Image
import requests
from io import BytesIO

def calculate_phash(image_url: str) -> str:
    """이미지 URL에서 pHash(Perceptual Hash)를 추출하여 시각적 유사도 비교"""
    try:
        response = requests.get(image_url, timeout=5)
        img = Image.open(BytesIO(response.content))
        return str(imagehash.phash(img))
    except Exception as e:
        print(f"이미지 해시 추출 실패: {e}")
        return ""

def is_same_product(item_a: dict, item_b: dict) -> bool:
    """
    두 판촉몰 상품이 동일한 제조사 상품인지 판단하는 하이브리드 로직
    1. 규격(용량/크기) 일치 여부
    2. 이미지 pHash 거리 10 이하
    """
    # 1. 용량/규격 검증
    if item_a.get("capacity") != item_b.get("capacity"):
        return False
        
    # 2. 이미지 유사도 검증
    hash_a = item_a.get("phash")
    hash_b = item_b.get("phash")
    
    if hash_a and hash_b:
        hamming_distance = imagehash.hex_to_hash(hash_a) - imagehash.hex_to_hash(hash_b)
        if hamming_distance <= 10:
            return True

    return False
