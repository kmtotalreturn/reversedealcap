import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

const dealSizeOptions = [
  "$5M - $15M",
  "$15M - $30M",
  "$30M - $50M",
  "$50M - $100M",
  "$100M+",
];

const industryOptions = [
  "Manufacturing",
  "Healthcare",
  "Technology",
  "Business Services",
  "Consumer Products",
  "Industrial",
  "Other",
];

const debtTypeOptions = [
  "Term Loan",
  "Revolver",
  "Acquisition Financing",
  "Recapitalization",
  "Growth Capital",
];

export default function LenderForm() {
  const [formData, setFormData] = useState({
    firmName: "",
    contactName: "",
    email: "",
    dealSizeRanges: [] as string[],
    preferredIndustries: [] as string[],
    debtTypes: [] as string[],
  });

  const submitMutation = trpc.lender.submit.useMutation({
    onSuccess: () => {
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({
        firmName: "",
        contactName: "",
        email: "",
        dealSizeRanges: [],
        preferredIndustries: [],
        debtTypes: [],
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit form. Please try again.");
    },
  });

  const handleCheckboxChange = (field: 'dealSizeRanges' | 'preferredIndustries' | 'debtTypes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="firmName" className="brutalist-body font-bold">Firm Name</Label>
            <Input
            id="firmName"
            value={formData.firmName}
            onChange={(e) => setFormData(prev => ({ ...prev, firmName: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="contactName" className="brutalist-body font-bold">Contact Name</Label>
            <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
            className="mt-2"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="brutalist-body font-bold">Email</Label>
            <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="mt-2"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label className="brutalist-body font-bold">Deal Size Range</Label>
        <div className="space-y-3">
          {dealSizeOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={`deal-${option}`}
                checked={formData.dealSizeRanges.includes(option)}
                onCheckedChange={() => handleCheckboxChange('dealSizeRanges', option)}
              />
              <Label htmlFor={`deal-${option}`} className="brutalist-body cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="brutalist-body font-bold">Preferred Industries</Label>
        <div className="space-y-3">
          {industryOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={`industry-${option}`}
                checked={formData.preferredIndustries.includes(option)}
                onCheckedChange={() => handleCheckboxChange('preferredIndustries', option)}
              />
              <Label htmlFor={`industry-${option}`} className="brutalist-body cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="brutalist-body font-bold">Debt Types</Label>
        <div className="space-y-3">
          {debtTypeOptions.map((option) => (
            <div key={option} className="flex items-center space-x-3">
              <Checkbox
                id={`debt-${option}`}
                checked={formData.debtTypes.includes(option)}
                onCheckedChange={() => handleCheckboxChange('debtTypes', option)}
              />
              <Label htmlFor={`debt-${option}`} className="brutalist-body cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="text-lg font-semibold w-full rounded-lg"
        disabled={submitMutation.isPending}
      >
        {submitMutation.isPending ? "Submitting..." : "Request Introductions"}
      </Button>
    </form>
  );
}
