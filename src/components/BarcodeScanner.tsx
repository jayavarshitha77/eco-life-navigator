
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScanBarcode, ShieldCheck, Leaf, AlertTriangle, Package, Recycle } from 'lucide-react';

interface ProductInfo {
  name: string;
  manufacturer: string;
  packaging: string;
  recyclable: boolean; 
  carbonFootprint: string;
  sustainabilityCertifications: string[];
  ecoScore: number;
  alternatives: string[];
}

const BarcodeScanner = () => {
  const [barcodeInput, setBarcodeInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);
  const { toast } = useToast();

  const handleScan = () => {
    if (!barcodeInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a barcode number to scan",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate API call to get product information
    setTimeout(() => {
      // Mock product data - in a real app, this would come from an API
      const mockProducts: Record<string, ProductInfo> = {
        '5901234123457': {
          name: 'Organic Granola',
          manufacturer: 'EcoMunch Foods',
          packaging: 'Cardboard box with recyclable plastic liner',
          recyclable: true,
          carbonFootprint: '0.8kg CO2e',
          sustainabilityCertifications: ['Rainforest Alliance', 'Carbon Trust'],
          ecoScore: 85,
          alternatives: ['Bulk bin granola (no packaging)', 'Local granola in glass jar']
        },
        '7312345678901': {
          name: 'Instant Noodles',
          manufacturer: 'QuickMeal Co.',
          packaging: 'Plastic container and film lid',
          recyclable: false,
          carbonFootprint: '2.4kg CO2e',
          sustainabilityCertifications: [],
          ecoScore: 35,
          alternatives: ['Dried noodles in cardboard packaging', 'Fresh noodles from local vendor']
        },
        '8436789012345': {
          name: 'Plant-Based Burger Patties',
          manufacturer: 'GreenEats',
          packaging: 'Cardboard box with plastic tray',
          recyclable: true,
          carbonFootprint: '1.2kg CO2e',
          sustainabilityCertifications: ['Vegan Society', 'B-Corp'],
          ecoScore: 70,
          alternatives: ['Make your own bean burgers', 'Local vendor plant burgers in paper wrapping']
        }
      };
      
      // Check if we have data for this barcode
      const foundProduct = mockProducts[barcodeInput] || {
        name: 'Sample Product',
        manufacturer: 'Generic Brand',
        packaging: 'Mixed materials packaging',
        recyclable: Math.random() > 0.5,
        carbonFootprint: `${(Math.random() * 3).toFixed(1)}kg CO2e`,
        sustainabilityCertifications: Math.random() > 0.7 ? ['Generic Eco Cert'] : [],
        ecoScore: Math.floor(Math.random() * 100),
        alternatives: ['Local alternative', 'Package-free option']
      };
      
      setProductInfo(foundProduct);
      setIsScanning(false);
      
      toast({
        title: "Product Scanned",
        description: `Found information for ${foundProduct.name}`,
      });
    }, 1500);
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanBarcode className="h-6 w-6 text-eco-500" />
            Barcode Eco-Impact Scanner
          </CardTitle>
          <CardDescription>
            Scan product barcodes to learn about their environmental impact and find more sustainable alternatives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="barcode">Enter Product Barcode</Label>
              <div className="flex mt-2">
                <Input 
                  id="barcode"
                  placeholder="e.g., 5901234123457" 
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleScan} 
                  className="ml-2 bg-eco-500 hover:bg-eco-600"
                  disabled={isScanning}
                >
                  {isScanning ? 'Scanning...' : 'Scan'}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Try these sample barcodes: 5901234123457, 7312345678901, or 8436789012345
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {productInfo && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{productInfo.name}</CardTitle>
              <div className={`${getEcoScoreColor(productInfo.ecoScore)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                Eco-Score: {productInfo.ecoScore}
              </div>
            </div>
            <CardDescription>{productInfo.manufacturer}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Package className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Packaging</p>
                    <p className="text-sm text-gray-600">{productInfo.packaging}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Recycle className={`h-5 w-5 ${productInfo.recyclable ? 'text-green-500' : 'text-red-500'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-medium">Recyclability</p>
                    <p className="text-sm text-gray-600">
                      {productInfo.recyclable ? 'Recyclable in most areas' : 'Not easily recyclable'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Leaf className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Carbon Footprint</p>
                    <p className="text-sm text-gray-600">{productInfo.carbonFootprint}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <ShieldCheck className={`h-5 w-5 ${productInfo.sustainabilityCertifications.length > 0 ? 'text-eco-500' : 'text-gray-400'} mt-0.5 flex-shrink-0`} />
                  <div>
                    <p className="font-medium">Sustainability Certifications</p>
                    {productInfo.sustainabilityCertifications.length > 0 ? (
                      <ul className="text-sm list-disc pl-5">
                        {productInfo.sustainabilityCertifications.map((cert, i) => (
                          <li key={i}>{cert}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-600">No certifications found</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Eco-Friendly Alternatives</p>
                    <ul className="text-sm list-disc pl-5">
                      {productInfo.alternatives.map((alt, i) => (
                        <li key={i}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm">
                <span className="font-medium">Pro Tip:</span> Compare different brands and packaging options to make more sustainable choices. Look for products with higher eco-scores.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BarcodeScanner;
