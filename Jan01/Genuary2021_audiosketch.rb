live_loop :random_beat do
  sample :drum_snare_hard if dice == 1
  sample :drum_snare_hard if one_in(6)
  sleep 0.125
  sleep 0.125
  live_loop :multi_beat do
    sample :elec_hi_snare if one_in(6)
    sample :drum_cymbal_closed if one_in(2)
    sample :drum_cymbal_pedal if one_in(3)
    sample :bd_haus if one_in(4)
    sleep 0.125
  end
end
